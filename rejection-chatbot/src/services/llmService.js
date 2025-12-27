import OpenAI from 'openai';
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

/**
 * LLM Service to generate contextual rejections
 * Supports OpenAI, Google Gemini, Anthropic Claude, and Ollama
 */
class LLMService {
  constructor() {
    this.provider = process.env.LLM_PROVIDER || 'gemini';
    this.initializeProvider();
  }

  initializeProvider() {
    switch (this.provider.toLowerCase()) {
      case 'openai':
        if (!process.env.OPENAI_API_KEY) {
          throw new Error('OPENAI_API_KEY is required when using OpenAI');
        }
        this.client = new OpenAI({
          apiKey: process.env.OPENAI_API_KEY
        });
        break;
      
      case 'gemini':
        if (!process.env.GEMINI_API_KEY) {
          throw new Error('GEMINI_API_KEY is required when using Gemini');
        }
        this.genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
        this.geminiModel = process.env.GEMINI_MODEL || 'gemini-pro';
        break;
      
      case 'anthropic':
        // Add Anthropic support if needed
        throw new Error('Anthropic support coming soon');
      
      case 'ollama':
        this.ollamaUrl = process.env.OLLAMA_BASE_URL || 'http://localhost:11434';
        this.ollamaModel = process.env.OLLAMA_MODEL || 'llama2';
        break;
      
      default:
        throw new Error(`Unsupported LLM provider: ${this.provider}`);
    }
  }

  /**
   * Generate a contextual rejection using LLM
   * @param {string} userRequest - The user's original request
   * @param {string} rejectionReason - The rejection reason from No-as-a-Service API
   * @param {object} context - Additional context (optional)
   * @returns {Promise<string>} Personalized rejection response
   */
  async generateContextualRejection(userRequest, rejectionReason, context = {}) {
    const prompt = this.buildPrompt(userRequest, rejectionReason, context);

    try {
      if (this.provider.toLowerCase() === 'openai') {
        return await this.generateWithOpenAI(prompt);
      } else if (this.provider.toLowerCase() === 'gemini') {
        return await this.generateWithGemini(prompt);
      } else if (this.provider.toLowerCase() === 'ollama') {
        return await this.generateWithOllama(prompt);
      }
    } catch (error) {
      console.error('Error generating rejection with LLM:', error.message);
      // Fallback to original rejection reason if LLM fails
      return rejectionReason;
    }
  }

  buildPrompt(userRequest, rejectionReason, context) {
    return `You are a helpful assistant that creates polite but firm contextual rejections.

User's Request: "${userRequest}"

Rejection Reason Template: "${rejectionReason}"

Your task:
1. Create a personalized rejection that addresses the specific request
2. Incorporate the style and tone of the rejection reason template
3. Make it feel natural and contextual to the user's request
4. Ensure it's a clear "no" but remains polite
5. Keep it concise (2-3 sentences maximum)

Generate a personalized rejection response:`;
  }

  async generateWithOpenAI(prompt) {
    const response = await this.client.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: 'You are a helpful assistant that creates contextual, polite rejections.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    return response.choices[0].message.content.trim();
  }

  async generateWithGemini(prompt) {
    const model = this.genAI.getGenerativeModel({ model: this.geminiModel });
    
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    return text.trim();
  }

  async generateWithOllama(prompt) {
    const axios = (await import('axios')).default;
    const response = await axios.post(
      `${this.ollamaUrl}/api/generate`,
      {
        model: this.ollamaModel,
        prompt: prompt,
        stream: false
      }
    );

    return response.data.response.trim();
  }
}

export default LLMService;

