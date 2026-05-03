import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import OpenAI from 'openai';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: 'https://api.groq.com/openai/v1',
});

const SYSTEM_PROMPT = `You are VoteTutor, a friendly and knowledgeable AI assistant that helps people understand the election process. Your expertise covers:
- Voter registration (eligibility, how to register, deadlines)
- The campaign process (primaries, debates, rallies, advertising)
- Voting day procedures (polling locations, what to bring, how to cast a ballot, mail-in voting)
- Vote counting and election results (how votes are tallied, electoral college, certification)
- General civics and democratic participation

Rules:
1. Always explain concepts in simple, easy-to-understand language suitable for first-time voters and students.
2. Be non-partisan — do not favor any political party or candidate.
3. If a question is not related to elections, voting, or civics, politely redirect the user back to election topics.
4. Use bullet points and numbered lists when explaining multi-step processes.
5. Keep answers concise but thorough (2-4 paragraphs max).
6. Be encouraging — remind users that their vote matters!`;

app.post('/api/chat', async (req, res) => {
  try {
    const { message, history = [] } = req.body;

    if (!message || typeof message !== 'string') {
      return res.status(400).json({ error: 'Message is required' });
    }

    const messages = [
      { role: 'system', content: SYSTEM_PROMPT },
      ...history.slice(-10),
      { role: 'user', content: message },
    ];

    const completion = await groq.chat.completions.create({
      model: 'llama-3.3-70b-versatile',
      messages,
      max_tokens: 600,
      temperature: 0.7,
    });

    const reply = completion.choices[0]?.message?.content || 'Sorry, I could not generate a response.';
    res.json({ reply });
  } catch (err) {
    console.error('Groq error:', err.message);
    if (err.status === 401) {
      return res.status(401).json({ error: 'Invalid API key. Please check your GROQ_API_KEY.' });
    }
    res.status(500).json({ error: 'Something went wrong. Please try again.' });
  }
});

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Serve static files from the React app build
const clientDistPath = path.join(__dirname, '..', 'client', 'dist');
app.use(express.static(clientDistPath));

// Catch-all: send index.html for any non-API route (SPA client-side routing)
app.get('*', (_req, res) => {
  res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`VoteTutor server running on http://localhost:${PORT}`);
});
