import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import NoApiService from './src/services/noApiService.js';
import LLMService from './src/services/llmService.js';
import ContextAnalyzer from './src/services/contextAnalyzer.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static('public'));

// Initialize services
const noApiService = new NoApiService(process.env.NO_API_URL || 'http://localhost:3000');
let llmService;
try {
  llmService = new LLMService();
} catch (error) {
  console.warn('LLM Service initialization failed:', error.message);
  console.warn('The chatbot will work but without LLM personalization.');
  llmService = null;
}
const contextAnalyzer = new ContextAnalyzer();

/**
 * Main chatbot endpoint
 * POST /api/reject
 * Body: { "message": "user's request" }
 */
app.post('/api/reject', async (req, res) => {
  try {
    const userRequest = req.body.message;

    if (!userRequest || typeof userRequest !== 'string' || userRequest.trim().length === 0) {
      return res.status(400).json({
        error: 'Please provide a valid message in the request body'
      });
    }

    // Step 1: Analyze context
    const context = contextAnalyzer.analyze(userRequest);
    console.log('Context analyzed:', context);

    // Step 2: Get rejection reason from No-as-a-Service API
    const rejectionReason = await noApiService.getRandomRejection();
    console.log('Rejection reason from API:', rejectionReason);

    // Step 3: Generate contextual rejection with LLM (if available)
    let finalRejection;
    if (llmService) {
      try {
        finalRejection = await llmService.generateContextualRejection(
          userRequest,
          rejectionReason,
          context
        );
        console.log('LLM-generated rejection:', finalRejection);
      } catch (llmError) {
        console.error('LLM error, using fallback:', llmError.message);
        finalRejection = rejectionReason;
      }
    } else {
      // Fallback to original rejection if LLM not available
      finalRejection = rejectionReason;
    }

    // Step 4: Return response
    res.json({
      rejection: finalRejection,
      context: context,
      originalReason: rejectionReason,
      personalized: llmService !== null
    });

  } catch (error) {
    console.error('Error processing request:', error);
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
});

/**
 * Health check endpoint
 */
app.get('/api/health', (req, res) => {
  res.json({
    status: 'ok',
    llmProvider: process.env.LLM_PROVIDER || 'not configured',
    llmAvailable: llmService !== null,
    noApiUrl: process.env.NO_API_URL || 'http://localhost:3000'
  });
});

/**
 * Root endpoint - serve frontend
 */
app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

// Start server
app.listen(PORT, () => {
  console.log(`\n🚫 Rejection Chatbot Server running on http://localhost:${PORT}`);
  console.log(`📡 No-as-a-Service API: ${process.env.NO_API_URL || 'http://localhost:3000'}`);
  console.log(`🤖 LLM Provider: ${llmService ? process.env.LLM_PROVIDER : 'Not configured'}`);
  console.log(`\n💡 Make sure your No-as-a-Service API is running on port 3000\n`);
});

