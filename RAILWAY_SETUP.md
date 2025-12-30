# Railway Setup Guide - DeepSeek API Key

## Setting Up the API Key in Railway

The chatbot now uses a default API key from Railway environment variables instead of asking users.

### Step 1: Get Your DeepSeek API Key

1. Visit [DeepSeek Platform](https://platform.deepseek.com/)
2. Sign up or log in
3. Navigate to **API Keys** section
4. Create a new API key
5. Copy the API key (starts with `sk-`)

### Step 2: Set Environment Variable in Railway

1. **Go to your Railway project:**
   - Open your project dashboard on Railway
   - Click on your project

2. **Navigate to Variables:**
   - Click on **"Variables"** tab (or **"Settings"** → **"Variables"**)

3. **Add the API Key:**
   - Click **"New Variable"** or **"+ Add"**
   - **Variable Name:** `DEEPSEEK_API_KEY`
   - **Value:** Paste your DeepSeek API key (e.g., `sk-xxxxxxxxxxxxx`)
   - Click **"Add"** or **"Save"**

4. **Redeploy:**
   - Railway will automatically redeploy when you add environment variables
   - Or manually trigger a redeploy from the **"Deployments"** tab

### Step 3: Verify

1. Visit your deployed website
2. Open the chatbot (click the chat button)
3. Ask a question - it should work without prompting for an API key!

## How It Works

1. **Build Time:** The `inject-config.js` script runs before deployment
2. **Injection:** It reads `DEEPSEEK_API_KEY` from Railway environment variables
3. **HTML Update:** It injects the API key into the HTML file
4. **Runtime:** The chatbot reads the API key from the injected script

## Local Development

For local development, you can either:

### Option 1: Set Environment Variable
```bash
export DEEPSEEK_API_KEY="your-api-key-here"
npm start
```

### Option 2: Use .env file (create one)
```bash
# .env file
DEEPSEEK_API_KEY=your-api-key-here
```

Then run:
```bash
npm start
```

### Option 3: Set via Browser Console (for testing)
```javascript
chatbot.setApiKey('your-api-key-here');
```

## Troubleshooting

### Chatbot Not Working

1. **Check Railway Variables:**
   - Go to Railway → Your Project → Variables
   - Verify `DEEPSEEK_API_KEY` is set correctly
   - Make sure there are no extra spaces

2. **Check Deployment Logs:**
   - Go to Railway → Your Project → Deployments
   - Click on the latest deployment
   - Check logs for "✅ DEEPSEEK_API_KEY found"

3. **Verify API Key:**
   - Make sure the API key is valid
   - Check DeepSeek platform for API key status
   - Ensure you have credits/quota available

4. **Redeploy:**
   - After setting the variable, trigger a new deployment
   - Wait for deployment to complete

### API Key Not Found Warning

If you see in logs: `⚠️ DEEPSEEK_API_KEY environment variable not set`

- Make sure you added the variable in Railway
- Variable name must be exactly: `DEEPSEEK_API_KEY`
- Redeploy after adding the variable

## Security Notes

- ✅ API key is injected at build time (not visible in source code)
- ✅ API key is not committed to git
- ⚠️ API key is visible in the HTML source (client-side)
- 💡 For enhanced security, consider using a backend proxy in the future

## File Structure

```
inject-config.js    # Script that injects API key from env var
package.json        # Runs inject-config.js before start
railway.json        # Railway deployment config
nixpacks.toml       # Alternative Railway config
```

## Quick Reference

**Railway Variable:**
- Name: `DEEPSEEK_API_KEY`
- Value: Your DeepSeek API key (starts with `sk-`)

**After Setting:**
- Railway auto-redeploys
- Or manually trigger redeploy
- Chatbot works automatically!


