import OpenAI from 'openai';
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';

// Setup __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
dotenv.config({ path: path.join(__dirname, '..', '.env') });

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function generateEmbeddings() {
  try {
    console.log('🚀 Starting embedding generation...\n');

    // Read knowledge base
    const knowledgePath = path.join(__dirname, '..', 'data', 'knowledge.json');
    const knowledgeData = await fs.readFile(knowledgePath, 'utf-8');
    const knowledge = JSON.parse(knowledgeData);

    console.log(`📚 Loaded ${knowledge.length} knowledge entries\n`);

    // Generate embeddings for each entry
    const embeddingsData = [];
    
    for (let i = 0; i < knowledge.length; i++) {
      const entry = knowledge[i];
      console.log(`Processing ${i + 1}/${knowledge.length}: ${entry.id}...`);

      try {
        // Create embedding using OpenAI's text-embedding-3-small model
        const response = await openai.embeddings.create({
          model: 'text-embedding-3-small',
          input: entry.text,
          encoding_format: 'float',
        });

        embeddingsData.push({
          id: entry.id,
          topic: entry.topic,
          text: entry.text,
          embedding: response.data[0].embedding,
        });

        console.log(`✓ Generated embedding (${response.data[0].embedding.length} dimensions)\n`);
      } catch (error) {
        console.error(`✗ Failed to generate embedding for ${entry.id}:`, error.message);
      }

      // Small delay to avoid rate limits
      if (i < knowledge.length - 1) {
        await new Promise(resolve => setTimeout(resolve, 200));
      }
    }

    // Save embeddings to file
    const outputPath = path.join(__dirname, '..', 'data', 'embeddings.json');
    await fs.writeFile(outputPath, JSON.stringify(embeddingsData, null, 2));

    console.log(`\n✨ Successfully generated and saved ${embeddingsData.length} embeddings!`);
    console.log(`📁 Output: ${outputPath}`);
    console.log(`📊 Total embedding dimensions: ${embeddingsData[0]?.embedding.length || 'N/A'}`);
  } catch (error) {
    console.error('❌ Error generating embeddings:', error);
    process.exit(1);
  }
}

generateEmbeddings();

