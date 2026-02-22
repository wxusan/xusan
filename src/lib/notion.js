const NOTION_API_KEY = import.meta.env.VITE_NOTION_API_KEY;
const NOTION_DATABASE_ID = import.meta.env.VITE_NOTION_DATABASE_ID;

// A generic fetch wrapper for Notion API
const fetchFromNotion = async (endpoint, body) => {
    // Determine the base URL based on whether we are in production (Vercel) or local development
    const baseUrl = import.meta.env.MODE === 'production'
        ? ''
        : 'http://localhost:5173'; // Usually vite runs on 5173

    // Call our serverless function instead of the direct Notion API
    // This securely hides the API key on the backend and bypasses browser CORS!
    const response = await fetch(`${baseUrl}/api/notion`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            endpoint,
            body
        })
    });

    if (!response.ok) {
        const err = await response.json();
        throw new Error(`Notion API proxy error: ${err.message || response.statusText}`);
    }

    return response.json();
};

export const getProjects = async () => {
    try {
        // Sort by the default "Created time" to try to match the table order, 
        // as Notion's API does not support purely arbitrary manual drag-and-drop table ordering without a specific sequence property.
        const data = await fetchFromNotion(`databases/${NOTION_DATABASE_ID}/query`, {
            sorts: [
                {
                    timestamp: 'created_time',
                    direction: 'ascending',
                },
            ],
        });

        return data.results.map((page) => {
            // Check if Technologies is a rich text list (bullet points) or multi_select
            let techArray = [];
            const techProp = page.properties['Technologies'];

            if (techProp?.type === 'multi_select') {
                techArray = techProp.multi_select.map(badge => badge.name);
            } else if (techProp?.type === 'rich_text') {
                const rawText = techProp.rich_text[0]?.plain_text || '';
                techArray = rawText.split('\n').map(t => t.replace('•', '').trim()).filter(Boolean);
            }

            return {
                id: page.id,
                title: page.properties['Project Title']?.title[0]?.plain_text || 'Untitled',
                description: page.properties['Description']?.rich_text[0]?.plain_text || '',
                image: page.properties['Image']?.files[0]?.file?.url || page.properties['Image']?.files[0]?.external?.url || '',
                images: page.properties['Image']?.files?.map(f => f.file?.url || f.external?.url).filter(Boolean) || [],
                liveLink: page.properties['Live Link']?.url || '',
                githubLink: page.properties['Github Link']?.url || '',
                tech: techArray,
            };
        });
    } catch (error) {
        console.error('Error fetching projects from Notion:', error);
        return [];
    }
};

export const getResume = async () => {
    try {
        const data = await fetchFromNotion(`databases/${NOTION_DATABASE_ID}/query`, {});

        // Find the first row that has a Resume PDF attached
        const rowWithResume = data.results.find(page => page.properties['Resume PDF']?.files?.length > 0);

        if (rowWithResume) {
            return rowWithResume.properties['Resume PDF']?.files[0]?.file?.url || '';
        }
        return '';
    } catch (error) {
        console.error('Error fetching resume from Notion:', error);
        return '';
    }
};
