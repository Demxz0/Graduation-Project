# Securing Your Groq API Key - Setup Guide

## Problem
Your API key was hardcoded in the frontend, exposing it publicly on GitHub and Netlify deployments.

## Solution
The API key is now handled securely using Netlify Functions as a backend proxy.

## Setup Steps

### 1. Remove the Exposed API Key from GitHub History
```bash
# Install BFG Repo-Cleaner (recommended) or use git filter-branch
# BFG is simpler: https://rtyley.github.io/bfg-repo-cleaner/

# Replace the API key in history
bfg --replace-text passwords.txt

# Or use git filter-branch for specific string
git filter-branch --tree-filter 'sed -i "s/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/REMOVED/g" $(find . -type f -name "*.jsx")' HEAD
```

### 2. Update Your Groq API Key (Regenerate)
Since the key was exposed, regenerate it:
1. Go to [Groq Console](https://console.groq.com)
2. Regenerate your API key
3. Save the new key (you'll need it for Netlify)

### 3. Set Up Environment Variables in Netlify

#### Option A: Using Netlify Dashboard
1. Go to your site settings in [Netlify](https://app.netlify.com)
2. Navigate to **Site Settings → Build & Deploy → Environment**
3. Click **Edit variables**
4. Add a new variable:
   - **Key:** `GROQ_API_KEY`
   - **Value:** Your new Groq API key
5. Redeploy your site

#### Option B: Using netlify.toml (already configured)
The `netlify.toml` file is already set up to read from environment variables.

### 4. Test Locally
```bash
# Create a .env file locally (this will be ignored by git)
echo "GROQ_API_KEY=your_new_api_key" > .env

# Install dependencies if needed
npm install

# Start the development server
npm start
```

### 5. Push Changes to GitHub
```bash
git add .
git commit -m "Secure API key with Netlify Functions proxy"
git push origin main
```

### 6. Trigger Netlify Redeploy
After pushing:
- Netlify will automatically redeploy
- Or manually redeploy in Netlify dashboard

## Files Changed
- `src/pages/ChatBot.jsx` - Now calls `/.netlify/functions/chatbot` instead of Groq API directly
- `netlify/functions/chatbot.js` - New backend function that securely handles API calls
- `netlify.toml` - Netlify configuration file (added)
- `.env.example` - Template for environment variables (for reference only)

## How It Works
1. Frontend sends message to `/.netlify/functions/chatbot`
2. Netlify Function retrieves API key from secure environment variables
3. Function calls Groq API with the secure key
4. Response is sent back to frontend
5. API key never exposed to the browser

## Security Best Practices
✅ API key stored only on Netlify servers  
✅ API key never sent to browser  
✅ API key never committed to GitHub  
✅ Only Netlify Function can access the key  
✅ CORS protected (only your domain can call the function)  

## Troubleshooting
- **Function not found:** Make sure `netlify.toml` is in your root directory
- **Env variable not working:** Rebuild the site after adding environment variables in Netlify
- **Still seeing API errors:** Check Netlify function logs in the Netlify dashboard
