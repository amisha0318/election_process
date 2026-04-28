const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const { GoogleGenerativeAI } = require('@google/generative-ai');
const axios = require('axios');
const admin = require('firebase-admin');
const { securityMiddleware, cacheMiddleware } = require('./middleware/security');

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(securityMiddleware); // Includes strict CSP and Compression

// Initialize Gemini
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Firebase Admin initialization (using service account from env if available)
if (process.env.FIREBASE_SERVICE_ACCOUNT) {
  const serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT);
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

// 1. Chat Interface with Gemini AI
app.post('/api/chat', async (req, res) => {
  try {
    const { message, history } = req.body;
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

    const chat = model.startChat({
      history: history || [],
      generationConfig: {
        maxOutputTokens: 1000,
      },
    });

    const systemPrompt = `You are the Election Process Education Assistant. 
    Your goal is to help users understand the US election process, timelines, and registration steps.
    Provide accurate, sourced answers. If you don't know something for sure, recommend visiting official sites like vote.gov or usa.gov/voting.
    Be helpful, non-partisan, and encouraging.`;

    const result = await chat.sendMessage(`${systemPrompt}\n\nUser: ${message}`);
    const response = await result.response;
    const text = response.text();

    res.json({ text });
  } catch (error) {
    console.error('Gemini Error:', error);
    res.status(500).json({ error: 'Failed to get response from Gemini' });
  }
});

// 2. Polling Place Finder (Civic Information API)
app.get('/api/voter-info', async (req, res) => {
  try {
    const { address } = req.query;
    const API_KEY = process.env.GOOGLE_CIVIC_API_KEY;
    
    // Fetch voter info (polling places, early voting, etc.)
    const voterResponse = await axios.get(`https://www.googleapis.com/civicinfo/v2/voterinfo`, {
      params: {
        key: API_KEY,
        address: address,
        electionId: 2000 // Placeholder
      }
    });

    // Fetch representatives (local officials)
    const repResponse = await axios.get(`https://www.googleapis.com/civicinfo/v2/representatives`, {
      params: {
        key: API_KEY,
        address: address
      }
    });

    res.json({
      ...voterResponse.data,
      representatives: repResponse.data.officials,
      offices: repResponse.data.offices
    });
  } catch (error) {
    console.error('Civic API Error:', error.response?.data || error.message);
    res.status(500).json({ error: 'Failed to fetch voter info' });
  }
});

const { TranslationServiceClient } = require('@google-cloud/translate');
const translationClient = new TranslationServiceClient();

// 3. Translation API
app.post('/api/translate', async (req, res) => {
  try {
    const { text, target } = req.body;
    if (!process.env.GOOGLE_CLOUD_PROJECT) {
      return res.json({ translatedText: text }); // Fallback
    }

    const request = {
      parent: `projects/${process.env.GOOGLE_CLOUD_PROJECT}/locations/global`,
      contents: [text],
      mimeType: 'text/plain',
      targetLanguageCode: target,
    };

    const [response] = await translationClient.translateText(request);
    res.json({ translatedText: response.translations[0].translatedText });
  } catch (error) {
    console.error('Translation Error:', error);
    res.status(500).json({ error: 'Translation failed' });
  }
});

// Serve static files in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  app.use(cacheMiddleware); // Apply caching to static assets
  app.use(express.static(path.join(__dirname, '../client/dist')));
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
