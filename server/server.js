import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { resumeData } from './data.js';

// Configuration
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT || 5000;

// Initialize Express
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '../client/dist')));

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const model = genAI.getGenerativeModel({
    model: "gemini-2.0-flash",
    systemInstruction: `You are the official AI assistant for Piyush Kumar's portfolio website. 
    Your personality is professional, concise, friendly, and helpful.
    
    Use the following JSON data to answer questions about Piyush:
    ${JSON.stringify(resumeData)}
    
    Rules:
    1. Answer ONLY based on the provided resume data. Do not make up any skills, projects, or experiences.
    2. If a recruiter asks a question that isn't covered in the resume data, politely state that you don't have that specific information and suggest they contact Piyush directly using the contact form or via email at piyushkk0206@gmail.com.
    3. Keep responses conversational and easy to read (use bullet points if listing multiple items like skills or projects).`
});

// --- API ROUTES ---

// Health Check
app.get('/api/health', (req, res) => {
    res.json({ status: 'ok', message: 'Core systems operational' });
});

// Chatbot Endpoint
app.post('/api/chat', async (req, res) => {
    const { message } = req.body;
    console.log(`[Chat] Query: "${message}"`);

    if (!message) return res.status(400).json({ error: "No message provided" });

    try {
        const result = await model.generateContent(message);
        const response = await result.response;
        const text = response.text();
        res.json({ reply: text });
    } catch (error) {
        console.error("Gemini Error:", error);

        // Specific Quota/Rate Limit handling for free tier
        if (error.status === 429) {
            return res.status(429).json({
                error: "Rate limit exceeded",
                reply: "// QUOTA_EXCEEDED\nThe AI engine is currently busy (free tier limit reached). Please wait 30-60 seconds and try again."
            });
        }

        // Model not found or deprecated
        if (error.status === 404) {
            return res.status(404).json({
                error: "Model not found",
                reply: "// ENGINE_NOT_FOUND\nEncountered a neural link error. Piyush might need to update my model identifier."
            });
        }

        res.status(500).json({ error: "Failed to generate AI response" });
    }
});

// Contact Form Endpoint (Placeholder for future nodemailer implementation)
app.post('/api/contact', async (req, res) => {
    const { email, message } = req.body;
    console.log(`[Contact] Transmission from ${email}: ${message}`);

    // Simulate processing time
    setTimeout(() => {
        res.status(200).json({ success: true, message: 'Data transmitted successfully' });
    }, 1000);
});

// SPA Catch-all (Express 5 compatible)
app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`\x1b[34m[System]\x1b[0m Digital Architect Server Online at port ${PORT}`);
    console.log(`\x1b[32m[Gemini]\x1b[0m AI Assistant initialized with model gemini-2.0-flash`);
});