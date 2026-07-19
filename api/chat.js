export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{
                    role: "user",
                    parts: [{ text: `You are an AI assistant for Sahas Abhishek, a 21-year-old engineering student at the University of Ruhuna. Answer based on this info: ${message}` }]
                }]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to AI" });
    }
}