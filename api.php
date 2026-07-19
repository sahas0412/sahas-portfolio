<?php
// JSON ආකාරයෙන් දත්ත හුවමාරු කිරීමට
header('Content-Type: application/json');

// Frontend එකෙන් එන පණිවිඩය ලබාගැනීම
$data = json_decode(file_get_contents('php://input'), true);
$userMessage = $data['message'] ?? '';

if (empty($userMessage)) {
    echo json_encode(['error' => 'Message is empty']);
    exit;
}

// ඔබේ API Key එක මෙතනට ඇතුලත් කරන්න (මෙය දැන් පිටතට නොපෙනේ)
$apiKey = 'Key';

// AI එක Train කරන උපදෙස් (System Prompt) දැන් ආරක්ෂිතව සර්වර් එකේ ඇත
$systemPrompt = "You are a helpful and polite AI assistant for Sahas Abhishek's personal portfolio website. You must always answer in English. 
Here is the information you know about Sahas:
- Full Name: Sahas Abhishek de Silva.
- Age: 21 years old.
- Education: First-semester engineering undergraduate student at the University of Ruhuna in Sri Lanka.
- YouTube Channel: Runs a channel named 'MindHerbs'. YouTube Link: https://youtube.com/@mindherbs?si=16MuivYd4BNEQkHa
- Ambitious Goals: Wants to become a dollar millionaire. He loves supercars.
- Business Plans: Planning an e-commerce business (Print on Demand).
- LinkedIn: https://www.linkedin.com/in/sahasabhishek
- Email: lhsadesilva@gmail.com";

// Gemini API URL එක
$url = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=" . $apiKey;

// API එකට යවන දත්ත සැකසීම
$requestData = [
    "system_instruction" => [
        "parts" => [["text" => $systemPrompt]]
    ],
    "contents" => [
        [
            "role" => "user",
            "parts" => [["text" => $userMessage]]
        ]
    ]
];

// cURL භාවිතයෙන් Google API Request එක යැවීම
$ch = curl_init($url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_HTTPHEADER, ['Content-Type: application/json']);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($requestData));

// API එකෙන් එන පිළිතුර ලබාගැනීම
$response = curl_exec($ch);
$error = curl_error($ch);
curl_close($ch);

// පිළිතුර නැවත Frontend එකට (ඔබේ වෙබ් අඩවියට) යැවීම
if ($error) {
    echo json_encode(['error' => 'Server Error: ' . $error]);
} else {
    echo $response;
}
?>