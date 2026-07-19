export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    // Sahas පිළිබඳ තොරතුරු
    const systemPrompt = `You are a helpful AI assistant for Sahas Abhishek, a 21-year-old engineering undergraduate student at the University of Ruhuna. 
    He is a creator on YouTube (MindHerbs), loves supercars, wants to become a dollar millionaire, and is planning an e-commerce business. 
    Answer questions based on this profile.`;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                "system_instruction": { "parts": [{ "text": systemPrompt }] },
                "contents": [{ "role": "user", "parts": [{ "text": message }] }]
            })
        });

        const data = await response.json();
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}