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

2. **Railway will automatically:**
   - Detect the static site
   - Use the `package.json` configuration
   - Deploy your site

3. **Set up custom domain (optional):**
   - Go to your project settings
   - Add a custom domain
   - Update DNS records as instructed

### Manual Deployment

If deploying manually:

```bash
# Install dependencies (if needed)
npm install

# Start local server
npm start
```

The site will be available at `http://localhost:3000`

## Chatbot Setup

The chatbot uses DeepSeek API to answer questions about me. To enable it:

1. **Get DeepSeek API Key:**
   - Visit [DeepSeek Platform](https://platform.deepseek.com/)
   - Sign up and create an API key

2. **Set API Key:**
   - Open the website
   - A prompt will appear asking for your API key
   - Enter your key (it's saved in browser localStorage)
   - Or use browser console: `chatbot.setApiKey('your-key-here')`

3. **Data Sources:**
   - Resume data: `assets/data/resume-data.txt`
   - Website data: `assets/data/website-data.json`
   - Live website content (extracted automatically)

## Project Structure

```
Anuj_Portfolio/
├── assets/
│   ├── css/
│   │   ├── chatbot.css      # Chatbot styles
│   │   └── styles.css        # Main styles
│   ├── js/
│   │   ├── chatbot.js        # Chatbot logic
│   │   └── main.js           # Main JavaScript
│   ├── data/
│   │   ├── resume-data.txt   # Extracted resume text
│   │   └── website-data.json # Website scraped data
│   ├── images/               # Image assets
│   └── img/                  # Icon assets
├── index.html                # Main HTML file
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

# Install serve (if not already installed)
npm install -g serve

# Start local server
npm start
# or
npx serve -s . -l 3000
```

## Environment Variables

For Railway deployment, no environment variables are required. The chatbot API key is managed client-side through browser localStorage.

## Notes

- The chatbot requires a DeepSeek API key to function
- API keys are stored in browser localStorage (client-side)
- For production, consider implementing a backend proxy for enhanced security
- All data files are included in the repository

## License

MIT

---

**Anuj Patel** - Data Scientist | Master's in Computer Science @ University of Texas at Arlington
