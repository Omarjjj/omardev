// This file loads and exports embeddings data for the serverless function
import { readFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Try different path resolutions for Vercel
let embeddingsData;

try {
  // Try relative path from api folder
  embeddingsData = JSON.parse(
    readFileSync(join(__dirname, '..', 'data', 'embeddings.json'), 'utf-8')
  );
} catch (error1) {
  try {
    // Try from process.cwd() (Vercel's working directory)
    embeddingsData = JSON.parse(
      readFileSync(join(process.cwd(), 'data', 'embeddings.json'), 'utf-8')
    );
  } catch (error2) {
    try {
      // Try absolute path in Vercel's file structure
      embeddingsData = JSON.parse(
        readFileSync('/var/task/data/embeddings.json', 'utf-8')
      );
    } catch (error3) {
      console.error('❌ Failed to load embeddings from all paths');
      console.error('Error 1:', error1.message);
      console.error('Error 2:', error2.message);
      console.error('Error 3:', error3.message);
      throw new Error('Could not load embeddings data');
    }
  }
}

export default embeddingsData;

