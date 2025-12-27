# Say No To Services

A collection of services and tools for generating polite and contextual rejections. This repository contains two main projects that work together to help you say "no" gracefully.

## Projects

### No-as-a-Service

A lightweight REST API that returns random rejection reasons from a curated database of over 1000 creative and polite ways to decline requests. Perfect for integrating into applications, bots, or personal use.

**Features:**
- Simple REST API endpoint
- Over 1000 unique rejection reasons
- Rate limiting (120 requests per minute per IP)
- Cloudflare IP support

**Location:** `no-as-a-service/`

**Documentation:** See `no-as-a-service/README.md` for detailed API documentation.

### Context-Aware Rejection Generator

An intelligent chatbot that generates personalized, contextual rejections using the No-as-a-Service API and Google Gemini AI. This application analyzes the context of incoming requests and creates tailored rejections that are both appropriate and considerate.

**Features:**
- Intelligent context analysis (detects request type, urgency, relationship, tone)
- LLM-powered personalization using Google Gemini AI
- Modern web interface with Tailwind CSS
- Real-time processing with smooth animations

**Location:** `rejection-chatbot/`

**Documentation:** See `rejection-chatbot/README.md` for detailed setup and usage instructions.

## Quick Start

### Prerequisites

- Node.js version 18 or higher
- npm (comes with Node.js)
- Google Gemini API key (for the chatbot)

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/RayanPinto/Say-No-To-Services.git
   cd Say-No-To-Services
   ```

2. Set up No-as-a-Service:
   ```bash
   cd no-as-a-service
   npm install
   npm start
   ```
   The API will run on `http://localhost:3000`

3. Set up Rejection Chatbot (in a new terminal):
   ```bash
   cd rejection-chatbot
   npm install
   ```
   
   Create a `.env` file:
   ```env
   PORT=3001
   NO_API_URL=http://localhost:3000
   LLM_PROVIDER=gemini
   GEMINI_API_KEY=your_gemini_api_key_here
   GEMINI_MODEL=gemini-pro
   ```
   
   Start the chatbot:
   ```bash
   npm start
   ```
   The chatbot will be available at `http://localhost:3001`

## Project Structure

```
Say-No-To-Services/
├── no-as-a-service/          # REST API for rejection reasons
│   ├── index.js              # Express server
│   ├── reasons.json          # Database of rejection reasons
│   └── package.json
├── rejection-chatbot/        # AI-powered rejection generator
│   ├── server.js             # Express server with LLM integration
│   ├── src/services/         # Service layer (API, LLM, Context)
│   ├── public/               # Web interface
│   └── package.json
└── README.md                 # This file
```

## How They Work Together

1. **No-as-a-Service** provides a database of rejection reasons via a simple REST API
2. **Rejection Chatbot** uses this API to fetch rejection templates
3. The chatbot analyzes the user's request context
4. Google Gemini AI personalizes the rejection to match the specific situation
5. The user receives a contextual, polite rejection

## Use Cases

- Personal productivity tools
- Chatbot integrations
- Email assistants
- Boundary-setting applications
- Professional communication tools
- Learning to say "no" gracefully

## API Endpoints

### No-as-a-Service

- `GET /no` - Returns a random rejection reason

### Rejection Chatbot

- `POST /api/reject` - Generate a contextual rejection
- `GET /api/health` - Check server status

## Configuration

Both projects use environment variables for configuration. See individual project README files for detailed configuration options.

## Contributing

This is a personal project, but suggestions and feedback are welcome. If you'd like to contribute:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License. You are free to use, modify, and distribute this software as needed.

## Author

Created by Rayan Pinto

## Acknowledgments

- Built with Express.js
- Powered by Google Gemini AI
- Uses Tailwind CSS for styling
- Inspired by the need for polite but firm communication

