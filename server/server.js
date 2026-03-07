import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import axios from 'axios';
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
    model: "gemini-2.5-flash", // The current standard free-tier model
    systemInstruction: `You are the official AI representative for Piyush Kumar's portfolio website. 
    
    CRITICAL IDENTITY RULE: If a user asks "What have YOU built?", "Tell me about YOUR skills", or uses the pronoun "you", they are referring to Piyush Kumar. You must answer using Piyush's information. NEVER break character. NEVER say you are a large language model or an AI created by Google.
    
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

// Coding Platform API Proxies
app.post('/api/leetcode', async (req, res) => {
    try {
        const { username } = req.body;
        const query = 'query getUserProfile($username: String!) { matchedUser(username: $username) { username profile { realName userAvatar reputation ranking } submitStats { acSubmissionNum { difficulty count submissions } } } }';
        
        const response = await axios.post('https://leetcode.com/graphql', {
            query,
            variables: { username }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Portfolio-App'
            }
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// LeetCode Active Days - Get recent submissions to calculate real active days
app.post('/api/leetcode-activity', async (req, res) => {
    try {
        const { username } = req.body;
        const query = `
            query getUserRecentSubmissions($username: String!) {
                recentSubmissionList(username: $username, limit: 100) {
                    title
                    titleSlug
                    timestamp
                    statusDisplay
                    lang
                }
            }
        `;
        
        const response = await axios.post('https://leetcode.com/graphql', {
            query,
            variables: { username }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Portfolio-App'
            }
        });
        
        // Calculate unique active days from submissions
        const submissions = response.data.data.recentSubmissionList || [];
        const uniqueDays = new Set();
        
        submissions.forEach(submission => {
            if (submission.statusDisplay === 'Accepted') {
                const date = new Date(submission.timestamp * 1000);
                const dateString = date.toISOString().split('T')[0]; // YYYY-MM-DD format
                uniqueDays.add(dateString);
            }
        });
        
        res.json({
            activeDays: uniqueDays.size,
            totalSubmissions: submissions.length,
            recentSubmissions: submissions.slice(0, 10) // Return last 10 submissions
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/leetcode-stats/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(`https://leetcode-stats-api.herokuapp.com/${username}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/codechef/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(`https://codechef-api.vercel.app/${username}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/gfg/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(`https://gfgstatscard.vercel.app/${username}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/hackerrank/:username', async (req, res) => {
    try {
        const { username } = req.params;
        const response = await axios.get(`https://hackerrank-stats-api.vercel.app/${username}`);
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/api/github/:username', async (req, res) => {
    try {
        const { username } = req.params;
        
        // Get basic user info
        const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
            headers: {
                'User-Agent': 'Portfolio-App'
            }
        });
        
        // Get contribution data using GraphQL
        const contributionQuery = `
            query($username: String!) {
                user(login: $username) {
                    contributionsCollection {
                        contributionCalendar {
                            totalContributions
                            weeks {
                                contributionDays {
                                    contributionCount
                                    date
                                }
                            }
                        }
                    }
                }
            }
        `;
        
        const contributionResponse = await axios.post('https://api.github.com/graphql', {
            query: contributionQuery,
            variables: { username }
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.GITHUB_TOKEN || ''}`,
                'User-Agent': 'Portfolio-App'
            }
        });
        
        // Calculate active days (days with contributions > 0)
        const contributions = contributionResponse.data.data.user.contributionsCollection.contributionCalendar;
        const activeDays = contributions.weeks.reduce((total, week) => {
            return total + week.contributionDays.filter(day => day.contributionCount > 0).length;
        }, 0);
        
        // Combine data
        const combinedData = {
            ...userResponse.data,
            totalContributions: contributions.totalContributions,
            activeDays: activeDays
        };
        
        res.json(combinedData);
    } catch (error) {
        console.error('GitHub API error:', error);
        // Fallback to basic user data if GraphQL fails
        try {
            const userResponse = await axios.get(`https://api.github.com/users/${username}`, {
                headers: {
                    'User-Agent': 'Portfolio-App'
                }
            });
            res.json({
                ...userResponse.data,
                totalContributions: 0,
                activeDays: 0
            });
        } catch (fallbackError) {
            res.status(500).json({ error: fallbackError.message });
        }
    }
});

app.post('/api/leetcode-contests', async (req, res) => {
    try {
        const { username } = req.body;
        const query = 'query getUserContestRankingInfo($username: String!) { userContestRanking(username: $username) { attendedContestsCount rating globalRanking totalParticipants topPercentage } userContestRankingHistory(username: $username) { contest { title startTime } rating ranking } }';
        
        const response = await axios.post('https://leetcode.com/graphql', {
            query,
            variables: { username }
        }, {
            headers: {
                'Content-Type': 'application/json',
                'User-Agent': 'Portfolio-App'
            }
        });
        
        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// SPA Catch-all (Express 5 compatible)
app.get('/{*path}', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

// Start Server
app.listen(PORT, () => {
    console.log(`\x1b[34m[System]\x1b[0m Digital Architect Server Online at port ${PORT}`);
    console.log(`\x1b[32m[Gemini]\x1b[0m AI Assistant initialized with model gemini-1.5-flash-8b`);
});