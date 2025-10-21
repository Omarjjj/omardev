// Simple health check endpoint for debugging
export default function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  
  if (req.method === 'OPTIONS') {
    res.status(200).end();
    return;
  }
  
  res.status(200).json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    message: 'AI Chat API is running',
    environment: process.env.NODE_ENV || 'production',
    hasApiKey: !!process.env.OPENAI_API_KEY
  });
}

