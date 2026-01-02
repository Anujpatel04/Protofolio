#!/usr/bin/env node
/**
 * Script to inject DeepSeek API key from environment variable into HTML
 * This runs before serving the static site on Railway
 */

const fs = require('fs');
const path = require('path');

const apiKey = process.env.DEEPSEEK_API_KEY || '';

if (!apiKey) {
    console.warn('⚠️  DEEPSEEK_API_KEY environment variable not set. Chatbot will not work.');
    console.warn('   Set it in Railway: Settings → Variables → Add DEEPSEEK_API_KEY');
} else {
    console.log('✅ DEEPSEEK_API_KEY found, injecting into HTML...');
}

// Read index.html
const htmlPath = path.join(__dirname, 'index.html');
let htmlContent = fs.readFileSync(htmlPath, 'utf8');

// Replace the placeholder API key with the actual one
const placeholder = "window.DEEPSEEK_API_KEY = '';";
const replacement = `window.DEEPSEEK_API_KEY = '${apiKey}';`;

if (htmlContent.includes(placeholder)) {
    htmlContent = htmlContent.replace(placeholder, replacement);
    fs.writeFileSync(htmlPath, htmlContent, 'utf8');
    console.log('✅ API key injected successfully');
} else {
    console.warn('⚠️  Could not find placeholder in HTML. Make sure the script tag exists.');
}





