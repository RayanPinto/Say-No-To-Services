# Context-Aware Rejection Generator

An intelligent chatbot that generates personalized, contextual rejections using the No-as-a-Service API and modern LLM integration. This application helps you craft polite but firm rejections tailored to specific requests and situations.

## Overview

The Context-Aware Rejection Generator combines the power of machine learning with a curated database of rejection reasons to create personalized responses. It analyzes the context of incoming requests and uses Google Gemini AI to generate rejections that are both appropriate and considerate.

## Features

**Intelligent Context Analysis**
Automatically detects request type, urgency level, relationship context, and tone from user input. This allows the system to generate rejections that match the specific situation.

**LLM-Powered Personalization**
Uses Google Gemini AI to create contextual rejections that address the specific request while maintaining the style and tone of the original rejection reason template.

**Modern Web Interface**
Beautiful, responsive chat interface built with Tailwind CSS. Features smooth animations, real-time status indicators, and an intuitive user experience.

**Flexible LLM Support**
Supports multiple LLM providers including Google Gemini, OpenAI, and local Ollama installations. The system gracefully falls back to original API responses if LLM is unavailable.

**Real-Time Processing**
Fast response times with loading indicators and smooth animations. Context analysis happens in real-time for immediate feedback.

## Prerequisites

Before you begin, ensure you have the following installed:

- Node.js version 18 or higher
- npm (comes with Node.js)
- No-as-a-Service API running on port 3000
- Google Gemini API key (recommended) or alternative LLM provider

## Installation

### Step 1: Clone or Navigate to the Project

If you haven't already, navigate to the rejection-chatbot directory:

```bash
cd rejection-chatbot
```

### Step 2: Install Dependencies

Install all required npm packages:

```bash
npm install
```

This will install Express, Google Generative AI SDK, Axios, and other dependencies.

### Step 3: Configure Environment Variables

Create a `.env` file in the rejection-chatbot directory. You can copy the example file:

```bash
cp .env.example .env
```

Then edit the `.env` file with your configuration:

```env
PORT=3001
NO_API_URL=http://localhost:3000
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-pro
```

### Step 4: Start No-as-a-Service API

In a separate terminal window, navigate to the no-as-a-service directory and start the API:

```bash
cd ../no-as-a-service
npm start
```

The API should be running on `http://localhost:3000`. Verify it's working by visiting that URL in your browser.

### Step 5: Start the Chatbot Server

Return to the rejection-chatbot directory and start the server:

```bash
npm start
```

The chatbot will be available at `http://localhost:3001`.

## Configuration

### Environment Variables

The application uses environment variables for configuration. Here are the available options:

**Server Configuration**
- `PORT` - Port number for the chatbot server (default: 3001)
- `NO_API_URL` - URL of the No-as-a-Service API (default: http://localhost:3000)

**LLM Provider Selection**
- `LLM_PROVIDER` - Choose from: `gemini`, `openai`, `ollama` (default: gemini)

**Google Gemini Configuration**
```env
LLM_PROVIDER=gemini
GEMINI_API_KEY=your_api_key_here
GEMINI_MODEL=gemini-pro
```

**OpenAI Configuration**
```env
LLM_PROVIDER=openai
OPENAI_API_KEY=your_api_key_here
```

**Ollama Configuration (Local LLM)**
```env
LLM_PROVIDER=ollama
OLLAMA_BASE_URL=http://localhost:11434
OLLAMA_MODEL=llama2
```

### Getting API Keys

**Google Gemini API Key**
1. Visit Google AI Studio at https://makersuite.google.com/app/apikey
2. Sign in with your Google account
3. Click "Create API Key"
4. Copy the key and add it to your `.env` file

**OpenAI API Key**
1. Visit https://platform.openai.com
2. Sign up or log in
3. Navigate to API Keys section
4. Create a new secret key
5. Copy and add to your `.env` file

**Ollama (Local)**
1. Install Ollama from https://ollama.ai
2. Pull a model: `ollama pull llama2`
3. Configure in `.env` as shown above

## Usage

### Web Interface

Once the server is running, open your browser and navigate to:

```
http://localhost:3001
```

You'll see a modern chat interface. Simply type your request in the input field and press Enter or click Send. The system will:

1. Analyze the context of your request
2. Fetch a rejection reason from the No-as-a-Service API
3. Use Gemini AI to personalize the rejection
4. Display the contextual rejection with analysis details

### API Endpoints

**POST /api/reject**

Generate a contextual rejection for a given request.

Request Body:
```json
{
  "message": "Can you help me move this weekend?"
}
```

Response:
```json
{
  "rejection": "I appreciate you thinking of me for your move, but I'm trying to be more intentional with what I agree to, and I've already committed my weekend to some much-needed rest.",
  "context": {
    "type": "favor",
    "urgency": "low",
    "relationship": "neutral",
    "tone": "polite",
    "keywords": ["help", "move", "weekend"]
  },
  "originalReason": "I'm trying to be more intentional with what I agree to...",
  "personalized": true
}
```

**GET /api/health**

Check server status and configuration.

Response:
```json
{
  "status": "ok",
  "llmProvider": "gemini",
  "llmAvailable": true,
  "noApiUrl": "http://localhost:3000"
}
```

## How It Works

The application follows a multi-step process to generate contextual rejections:

1. **Request Reception**: User sends a message through the web interface or API
2. **Context Analysis**: The system analyzes the request to determine type, urgency, relationship, and tone
3. **Rejection Template Fetching**: A random rejection reason is retrieved from the No-as-a-Service API
4. **LLM Personalization**: Google Gemini AI personalizes the rejection to match the specific request
5. **Response Delivery**: The contextual rejection is returned with analysis metadata

## Project Structure

```
rejection-chatbot/
├── server.js                 # Main Express server and route handlers
├── src/
│   └── services/
│       ├── noApiService.js   # Integration with No-as-a-Service API
│       ├── llmService.js     # LLM provider abstraction layer
│       └── contextAnalyzer.js # Context extraction from user input
├── public/
│   └── index.html            # Frontend chat interface
├── package.json              # Dependencies and scripts
├── .env                      # Environment configuration (not in git)
└── README.md                 # This file
```

## Development

### Running in Development Mode

For development with auto-reload on file changes:

```bash
npm run dev
```

### Testing the Application

1. Ensure both servers are running (No-as-a-Service on port 3000, chatbot on port 3001)
2. Open the web interface at http://localhost:3001
3. Try various request types:
   - Work requests: "I need you to work overtime tonight"
   - Personal favors: "Can you help me move this weekend?"
   - Invitations: "Want to come to my party on Friday?"
   - Financial requests: "Can I borrow some money?"

### Troubleshooting

**Server won't start**
- Check if port 3001 is already in use
- Verify all dependencies are installed: `npm install`
- Check for syntax errors: `node -c server.js`

**LLM not working**
- Verify your API key is correct in `.env`
- Check that the LLM provider is set correctly
- Review server logs for error messages
- The system will fall back to original API responses if LLM fails

**No-as-a-Service API connection issues**
- Ensure the API is running on port 3000
- Check the NO_API_URL in your `.env` file
- Test the API directly: `curl http://localhost:3000/no`

## Architecture

The application is built with a modular architecture:

**Service Layer**
- `NoApiService`: Handles communication with the No-as-a-Service API
- `LLMService`: Abstracts LLM provider differences, supports multiple providers
- `ContextAnalyzer`: Extracts semantic information from user requests

**Server Layer**
- Express.js handles HTTP requests and routing
- Middleware for CORS, JSON parsing, and static file serving
- Error handling with graceful fallbacks

**Frontend Layer**
- Vanilla JavaScript for interactivity
- Tailwind CSS for styling
- Responsive design for all screen sizes

## Future Enhancements

Planned improvements include:

- Conversation history and context retention
- User preference learning and customization
- Multiple rejection options per request
- Analytics dashboard for usage patterns
- Rate limiting and request throttling
- Caching layer for improved performance
- Support for additional LLM providers
- Export functionality for rejection templates

## Contributing

This is a personal project, but suggestions and feedback are welcome. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software as needed.

## Acknowledgments

- Built on top of the No-as-a-Service API
- Powered by Google Gemini AI
- Uses Tailwind CSS for styling
- Express.js for the server framework

## Support

If you encounter any issues or have questions:

1. Check the troubleshooting section above
2. Review the server logs for error messages
3. Verify your configuration in the `.env` file
4. Ensure all prerequisites are installed correctly

For issues with the No-as-a-Service API, refer to its documentation in the `no-as-a-service` directory.
