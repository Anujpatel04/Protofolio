# Anuj Patel - Portfolio Website

A modern, interactive portfolio website showcasing my work as a Data Scientist. Built with HTML, CSS, and JavaScript, featuring an AI-powered chatbot.

## Features

- 🎨 Interactive background effects
- 📱 Fully responsive design
- 💼 Project showcase with detailed descriptions
- 📚 Research & Writing section
- 🛠️ Skills display with animated scrolling
- 📞 Contact information
- 🤖 **AI-powered chatbot** using DeepSeek API that answers questions about me

## Technologies Used

- HTML5
- CSS3
- JavaScript (Vanilla)
- Font Awesome Icons
- DeepSeek API (for chatbot)

## Deployment on Railway

### Quick Deploy

1. **Connect your repository to Railway:**
   - Go to [Railway](https://railway.app)
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose this repository

2. **Set DeepSeek API Key (Required for Chatbot):**
   - Go to Railway → Your Project → **Variables**
   - Click **"New Variable"**
   - **Name:** `DEEPSEEK_API_KEY`
   - **Value:** Your DeepSeek API key (get it from [platform.deepseek.com](https://platform.deepseek.com/))
   - Click **"Add"**
   - Railway will auto-redeploy

3. **Railway will automatically:**
   - Detect the static site
   - Inject the API key into the HTML
   - Deploy your site

4. **Set up custom domain (optional):**
   - Go to your project settings
   - Add a custom domain
   - Update DNS records as instructed

### Manual Deployment

If deploying manually:

```bash
# Set API key (required)
export DEEPSEEK_API_KEY="your-api-key-here"

# Install dependencies (if needed)
npm install

# Start local server
npm start
```

The site will be available at `http://localhost:3000`

## Chatbot Setup

The chatbot uses DeepSeek API to answer questions about me. The API key is automatically injected from Railway environment variables.

### Setting Up API Key in Railway

1. **Get DeepSeek API Key:**
   - Visit [DeepSeek Platform](https://platform.deepseek.com/)
   - Sign up and create an API key

2. **Set in Railway:**
   - Go to Railway → Your Project → **Variables**
   - Add variable: `DEEPSEEK_API_KEY`
   - Value: Your API key (starts with `sk-`)
   - Railway will auto-redeploy

3. **Data Sources:**
   - Resume data: `assets/data/resume-data.txt`
   - Website data: `assets/data/website-data.json`
   - Live website content (extracted automatically)

📖 **Detailed instructions:** See [RAILWAY_SETUP.md](RAILWAY_SETUP.md)

## Project Structure

```
Anuj_Portfolio/
├── assets/
│   ├── css/
│   │   ├── chatbot.css      # Chatbot styles
│   │   └── styles.css        # Main styles
│   ├── js/
│   │   ├── chatbot.js        # Chatbot logic
│   │   ├── config.js         # Chatbot config
│   │   └── main.js           # Main JavaScript
│   ├── data/
│   │   ├── resume-data.txt   # Extracted resume text
│   │   └── website-data.json # Website scraped data
│   ├── images/               # Image assets
│   └── img/                  # Icon assets
├── index.html                # Main HTML file
├── inject-config.js          # Script to inject API key
├── package.json              # Node.js configuration
├── railway.json              # Railway deployment config
├── nixpacks.toml             # Nixpacks configuration
└── README.md                 # This file
```

## Local Development

```bash
# Clone the repository
git clone <your-repo-url>
cd Anuj_Portfolio

# Set API key
export DEEPSEEK_API_KEY="your-api-key-here"

# Start local server
npm start
# or
npx serve -s . -l 3000
```

## Environment Variables

For Railway deployment:
- `DEEPSEEK_API_KEY` - Your DeepSeek API key (required for chatbot)

The API key is automatically injected into the HTML at build time.

## Notes

- The chatbot requires a DeepSeek API key to function
- API key is injected at build time (not visible in source code)
- All data files are included in the repository
- For local development, set `DEEPSEEK_API_KEY` environment variable

## License

MIT

---

**Anuj Patel** - Data Scientist | Master's in Computer Science @ University of Texas at Arlington
