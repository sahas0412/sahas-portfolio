export default async function handler(req, res) {
    if (req.method !== 'POST') return res.status(405).end();
    
    const { message } = req.body;
    const apiKey = process.env.GEMINI_API_KEY;

    try {
        const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${apiKey}`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                contents: [{ parts: [{ text: message }] }]
            })
        });

        const data = await response.json();
        
        // දත්ත ලැබෙනවාදැයි බැලීමට මෙය එකතු කරන්න
        if (!response.ok) {
            return res.status(500).json({ error: "Gemini API Error", details: data });
        }
        
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: "Failed to connect to AI", message: error.message });
    }
}