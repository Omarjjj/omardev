import OpenAI from 'openai';
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

// Get current directory in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load embeddings from JSON file
const embeddingsData = JSON.parse(
  readFileSync(join(__dirname, '..', 'data', 'embeddings.json'), 'utf-8')
);

// Initialize OpenAI (uses OPENAI_API_KEY from environment)
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Cosine similarity function
function cosineSimilarity(vecA, vecB) {
  const dotProduct = vecA.reduce((sum, a, i) => sum + a * vecB[i], 0);
  const magnitudeA = Math.sqrt(vecA.reduce((sum, a) => sum + a * a, 0));
  const magnitudeB = Math.sqrt(vecB.reduce((sum, b) => sum + b * b, 0));
  return dotProduct / (magnitudeA * magnitudeB);
}

// Find most relevant knowledge entries
function findRelevantContext(queryEmbedding, topK = 3) {
  const similarities = embeddingsData.map(entry => ({
    ...entry,
    similarity: cosineSimilarity(queryEmbedding, entry.embedding),
  }));

  return similarities
    .sort((a, b) => b.similarity - a.similarity)
    .slice(0, topK)
    .map(({ id, topic, text, similarity }) => ({ id, topic, text, similarity }));
}

// Vercel Serverless Function Handler
export default async function handler(req, res) {
  // Enable CORS
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  // Handle preflight OPTIONS request
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }

  // Only allow POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { message, conversationHistory = [] } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    console.log('📨 Received message:', message);

    // Generate embedding for user's query
    const queryEmbedding = await openai.embeddings.create({
      model: 'text-embedding-3-small',
      input: message,
      encoding_format: 'float',
    });

    // Find relevant context from knowledge base
    const relevantContext = findRelevantContext(
      queryEmbedding.data[0].embedding,
      3
    );

    console.log('🔍 Found relevant context:', relevantContext.map(c => c.id));

    // Build context string
    const contextString = relevantContext
      .map(c => `[${c.topic}] ${c.text}`)
      .join('\n\n');

    // Build messages for GPT
    const systemMessage = {
      role: 'system',
      content: `You are Omar's AI assistant, helping visitors learn about Omar Nader Hussein Jaber - a talented Computer Science student and developer. You are friendly, enthusiastic, and knowledgeable about Omar's projects, skills, and achievements.

CRITICAL INSTRUCTION: You MUST ALWAYS respond using Markdown formatting. NEVER use plain text. This is MANDATORY and NON-NEGOTIABLE.

Every single response must contain:
- At least 3-5 **bold** terms (for names, numbers, achievements)
- At least 2-3 \`code\` terms (for technologies)
- Bullet points (▹) when listing anything
- At least 1 emoji

If you respond without markdown formatting, you have FAILED the task.

FORMATTING RULES (MANDATORY):
1. Use **bold** for ALL project names, key achievements, and important numbers
2. Use *italics* for technical terms and subtle emphasis
3. Use \`code formatting\` for ALL programming languages, frameworks, and tools
4. Use bullet points (▹) for listing features, skills, or achievements
5. Use ## for section headers in longer responses
6. Add emojis strategically (1-3 per response) for personality
7. Break into short paragraphs (2-3 sentences max)

EXAMPLE RESPONSES:

Q: "What are Omar's technical skills?"
A: "Omar is a **full-stack powerhouse**! ⚡

## Programming Languages
\`C++\` • \`Java\` • \`Python\` • \`JavaScript\` • \`TypeScript\` • \`C#\` • \`Kotlin\`

## Frontend
▹ **React** with \`Tailwind CSS\` and \`TypeScript\`
▹ \`GSAP\` & \`Framer Motion\` for animations
▹ \`Three.js\` for 3D experiences

## Backend & AI
▹ \`Node.js\` + \`Express.js\` + \`MongoDB\`
▹ \`FastAPI\` for Python APIs
▹ \`OpenAI API\`, \`Pinecone\`, \`scikit-learn\`

He's been creating *company-level work* as a student! 🎨"

Q: "Tell me about a project"
A: "The **Multi-University AI Assistant** is Omar's flagship project! 🚀

It serves **6 Palestinian universities** and reaches **40,000+ students**. Built with \`React\`, \`TypeScript\`, \`FastAPI\`, and \`Pinecone\`, it provides:

▹ Bilingual chat (*Arabic* and *English*)
▹ University-specific information
▹ Persona-based responses
▹ Tinder-style major selection

Valued at **$30,000** and officially funded by the university! The leadership called it *"company-level work"*. Want to know more? 💡"

RESPONSE STRUCTURE:
1. Start with catchy opening + emoji
2. Use markdown formatting for ALL key terms
3. Structure with bullets or sections
4. End with engaging hook

CONTEXT FROM KNOWLEDGE BASE:
${contextString}`,
    };

    // Add few-shot examples BEFORE conversation to force markdown formatting
    const fewShotExamples = [
      {
        role: 'user',
        content: 'What are his skills?'
      },
      {
        role: 'assistant',
        content: 'Omar is a **full-stack developer**! ⚡\n\nHe masters `React`, `TypeScript`, `Python`, and `Node.js`.\n\n▹ **Frontend**: `Tailwind CSS`, `GSAP`, `Framer Motion`\n▹ **Backend**: `Express.js`, `FastAPI`, `MongoDB`\n▹ **AI/ML**: `OpenAI API`, `Pinecone`\n\nHe creates *company-level work* as a student! 🎨'
      }
    ];

    const messages = [
      systemMessage,
      ...fewShotExamples,
      ...conversationHistory.slice(-6),
      { role: 'user', content: message },
    ];

    // Get response from GPT
    console.log('🤖 Calling OpenAI...');
    const completion = await openai.chat.completions.create({
      model: 'gpt-4-turbo-preview',
      messages: messages,
      temperature: 0.8,
      max_tokens: 400,
      presence_penalty: 0.6,
      frequency_penalty: 0.3,
    });

    const reply = completion.choices[0].message.content;
    console.log('✅ Got response from OpenAI');

    res.status(200).json({
      reply,
      relevantContext: relevantContext.map(c => ({ id: c.id, topic: c.topic })),
    });
  } catch (error) {
    console.error('❌ Error in chat endpoint:', error);
    res.status(500).json({
      error: 'Failed to process chat message',
      details: error.message,
    });
  }
}

