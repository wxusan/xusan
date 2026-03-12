import fetch from 'node-fetch';

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ message: 'Method Not Allowed' });
    }

    let parsedBody = req.body;
    if (typeof req.body === 'string') {
        try {
            parsedBody = JSON.parse(req.body);
        } catch (e) {
            return res.status(400).json({ message: 'Invalid JSON body' });
        }
    }

    const { text, targetLang } = parsedBody;

    if (!text || !targetLang) {
        return res.status(400).json({ message: 'Missing text or targetLang' });
    }

    try {
        const email = process.env.MYMEMORY_EMAIL;
        const deParam = email ? `&de=${encodeURIComponent(email)}` : '';
        const url = `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|${targetLang}${deParam}`;

        const response = await fetch(url);
        const data = await response.json();

        if (!response.ok || data.responseStatus !== 200) {
            return res.status(200).json({ translatedText: null });
        }

        return res.status(200).json({ translatedText: data.responseData.translatedText });
    } catch (error) {
        console.error('Translation API Error:', error);
        return res.status(200).json({ translatedText: null });
    }
}
