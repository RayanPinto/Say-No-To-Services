# Quick Setup Guide

## Step 1: Make sure No-as-a-Service API is running

In a separate terminal, navigate to the `no-as-a-service` directory and start it:

```bash
cd ../no-as-a-service
npm start
```

The API should be running on `http://localhost:3000`

## Step 2: Configure the Chatbot

Create a `.env` file in the `rejection-chatbot` directory:

**For Google Gemini (Recommended):**
```env
PORT=3001
NO_API_URL=http://localhost:3000
LLM_PROVIDER=gemini
GEMINI_API_KEY=AIzaSyCns0kbwESMxJjlNFEFaBOv7OGUihksNtc
GEMINI_MODEL=gemini-pro
```

**For OpenAI:**
```env
PORT=3001
NO_API_URL=http://localhost:3000
LLM_PROVIDER=openai
OPENAI_API_KEY=your_openai_api_key_here
```

**Note:** If you don't have an LLM API key, you can:
- Leave `LLM_PROVIDER` empty or set it to `ollama` for local LLM
- The chatbot will still work but use the original rejection reasons without personalization

## Step 3: Start the Chatbot

```bash
npm start
```

## Step 4: Open in Browser

Navigate to: `http://localhost:3001`

## Testing Without LLM

If you want to test without LLM (uses original API responses):

1. Don't set `OPENAI_API_KEY` in `.env`
2. The chatbot will automatically fall back to using the original rejection reasons
3. It will still work, just without personalization

## Using Ollama (Local LLM)

1. Install Ollama: https://ollama.ai
2. Pull a model: `ollama pull llama2`
3. Set in `.env`:
   ```env
   LLM_PROVIDER=ollama
   OLLAMA_BASE_URL=http://localhost:11434
   OLLAMA_MODEL=llama2
   ```

## Example Requests to Try

- "Can you help me move this weekend?"
- "I need you to work overtime tonight"
- "Want to come to my party on Friday?"
- "Can I borrow some money?"
- "We need to schedule a meeting tomorrow"

