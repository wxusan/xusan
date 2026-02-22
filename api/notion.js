import fetch from 'node-fetch';

export default async function handler(req, res) {
    // Only allow POST requests
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    // Vercel sometimes passes the body as a string depending on headers
    let parsedBody = req.body;
    if (typeof req.body === 'string') {
        try {
            parsedBody = JSON.parse(req.body);
        } catch (e) {
            return res.status(400).json({ message: 'Invalid JSON body' });
        }
    }

    const { endpoint, body } = parsedBody;
    const NOTION_API_KEY = process.env.VITE_NOTION_API_KEY;

    if (!NOTION_API_KEY) {
        return res.status(500).json({ message: 'Missing Notion API Key in Vercel Environment Variables' });
    }

    try {
        const url = `https://api.notion.com/v1/${endpoint}`;

        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${NOTION_API_KEY}`,
                'Notion-Version': '2022-06-28',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(body || {}),
        });

        const data = await response.json();

        if (!response.ok) {
            return res.status(response.status).json(data);
        }

        return res.status(200).json(data);
    } catch (error) {
        console.error('Vercel API Error:', error);
        return res.status(500).json({ message: 'Internal Server Error fetching from Notion', error: error.message });
    }
}
