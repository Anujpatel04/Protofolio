// Chatbot functionality with DeepSeek API
class PortfolioChatbot {
    constructor() {
        this.isOpen = false;
        this.conversationHistory = [];
        this.resumeData = '';
        this.websiteData = '';
        this.websiteJsonData = ''; // Additional website data from JSON
        // Get API key from config or environment variable
        this.apiKey = (window.CHATBOT_CONFIG && window.CHATBOT_CONFIG.apiKey) || 
                      window.DEEPSEEK_API_KEY || 
                      localStorage.getItem('deepseek_api_key') || 
                      '';
        this.apiUrl = (window.CHATBOT_CONFIG && window.CHATBOT_CONFIG.apiUrl) || 
                     'https://api.deepseek.com/v1/chat/completions';
        
        this.init();
    }

    async init() {
        await this.loadResumeData();
        await this.loadWebsiteJsonData();
        await this.extractWebsiteData();
        this.setupEventListeners();
    }

    async loadResumeData() {
        try {
            // Try to load resume text from a pre-extracted file
            const response = await fetch('assets/data/resume-data.txt');
            if (response.ok) {
                this.resumeData = await response.text();
                console.log('Resume data loaded successfully');
            } else {
                // Fallback: Create a basic resume data from website content
                console.warn('Resume data file not found. Using website content as fallback.');
                this.resumeData = 'Resume data not available. Using website content only.';
            }
        } catch (error) {
            console.error('Error loading resume data:', error);
            this.resumeData = 'Resume data could not be loaded. Using website content only.';
        }
    }

    async loadWebsiteJsonData() {
        try {
            // Try to load website data from JSON file
            const response = await fetch('assets/data/website-data.json');
            if (response.ok) {
                const jsonData = await response.json();
                // Extract markdown content from the JSON
                if (jsonData.data && jsonData.data.markdown) {
                    this.websiteJsonData = jsonData.data.markdown;
                    console.log('Website JSON data loaded successfully');
                } else {
                    console.warn('Website JSON file found but markdown content not available');
                }
            } else {
                console.warn('Website JSON data file not found. Will use live website extraction only.');
            }
        } catch (error) {
            console.error('Error loading website JSON data:', error);
        }
    }

    async extractWebsiteData() {
        // Extract relevant text from the website
        const sections = document.querySelectorAll('section');
        let websiteText = '';

        sections.forEach(section => {
            const text = section.innerText || section.textContent;
            if (text) {
                websiteText += text + '\n\n';
            }
        });

        // Also extract from specific sections
        const heroText = document.querySelector('.hero-content')?.innerText || '';
        const projects = Array.from(document.querySelectorAll('.project-card')).map(card => {
            return card.innerText || '';
        }).join('\n\n');
        const qualifications = document.querySelector('#qualifications')?.innerText || '';
        const skills = document.querySelector('#skills')?.innerText || '';

        // Combine live website data with JSON data
        const liveWebsiteData = `
Website Content (Live):
${heroText}
${qualifications}
${projects}
${skills}
${websiteText}
        `.trim();

        // Combine with JSON data if available
        if (this.websiteJsonData) {
            this.websiteData = `
${this.websiteJsonData}

---

${liveWebsiteData}
            `.trim();
        } else {
            this.websiteData = liveWebsiteData;
        }
    }

    setupEventListeners() {
        const chatButton = document.getElementById('chatbot-toggle');
        const chatWindow = document.getElementById('chatbot-window');
        const closeButton = document.getElementById('chatbot-close');
        const sendButton = document.getElementById('chatbot-send');
        const inputField = document.getElementById('chatbot-input');

        if (chatButton) {
            chatButton.addEventListener('click', () => this.toggleChat());
        }

        if (closeButton) {
            closeButton.addEventListener('click', () => this.toggleChat());
        }

        if (sendButton) {
            sendButton.addEventListener('click', () => this.sendMessage());
        }

        if (inputField) {
            inputField.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.sendMessage();
                }
            });
        }
    }

    toggleChat() {
        this.isOpen = !this.isOpen;
        const chatWindow = document.getElementById('chatbot-window');
        const chatButton = document.getElementById('chatbot-toggle');

        if (chatWindow) {
            if (this.isOpen) {
                chatWindow.classList.add('active');
                document.getElementById('chatbot-input')?.focus();
            } else {
                chatWindow.classList.remove('active');
            }
        }

        if (chatButton) {
            chatButton.classList.toggle('active', this.isOpen);
        }
    }

    async sendMessage() {
        const inputField = document.getElementById('chatbot-input');
        const message = inputField?.value.trim();

        if (!message) return;

        // Check if API key is set
        if (!this.apiKey) {
            this.showMessage('Please set your DeepSeek API key in the chatbot configuration.', 'bot');
            return;
        }

        // Add user message to UI
        this.addMessageToUI(message, 'user');
        inputField.value = '';

        // Show typing indicator
        const typingId = this.showTypingIndicator();

        try {
            // Get response from DeepSeek
            const response = await this.getChatbotResponse(message);
            
            // Remove typing indicator
            this.removeTypingIndicator(typingId);
            
            // Add bot response to UI
            this.addMessageToUI(response, 'bot');
        } catch (error) {
            this.removeTypingIndicator(typingId);
            this.addMessageToUI('Sorry, I encountered an error. Please try again later.', 'bot');
            console.error('Chatbot error:', error);
        }
    }

    async getChatbotResponse(userMessage) {
        // Build context from resume and website data
        const context = this.buildContext(userMessage);

        // Build context string
        const contextData = [];
        if (this.resumeData && !this.resumeData.includes('not available') && !this.resumeData.includes('could not be loaded')) {
            contextData.push(`Resume/CV Information:\n${this.resumeData}`);
        }
        if (this.websiteData) {
            contextData.push(`Website Content:\n${this.websiteData}`);
        }
        const fullContext = contextData.join('\n\n---\n\n');

        const messages = [
            {
                role: 'system',
                content: `You are a professional AI assistant providing information ABOUT Anuj Patel. You are NOT Anuj Patel. You are a helpful assistant that answers questions about Anuj.

Anuj Patel is a Data Scientist and Master's student at University of Texas at Arlington.

Use this information to answer questions about Anuj:

${fullContext}

CRITICAL INSTRUCTIONS:
- You are an ASSISTANT talking ABOUT Anuj, NOT Anuj himself
- Always refer to Anuj in third person (e.g., "Anuj is...", "He has...", "His projects include...")
- NEVER say "I am Anuj" or "I have" - always use third person
- If user greets you or asks a generic question, professionally ask: "What would you like to know about Anuj? I can tell you about his education, projects, skills, work experience, or research."
- Be BRIEF and PRECISE - maximum 2-3 sentences per answer
- Answer ONLY from the provided information
- ABSOLUTELY NO MARKDOWN FORMATTING - NEVER use **, #, *, `, or any markdown syntax
- Write in plain text only - no bold, no headers, no markdown, no special formatting
- Use simple dashes (-) for lists if needed, but NO markdown
- No fluff or unnecessary words
- If information is unavailable, say "I don't have that information about Anuj" - nothing more
- Focus on facts: skills, education, projects, experience
- Keep it conversational but very concise and professional
- Example: "Anuj is a Data Scientist pursuing his Master's at UT Arlington. He specializes in machine learning and NLP."`
            },
            ...this.conversationHistory,
            {
                role: 'user',
                content: userMessage
            }
        ];

        const response = await fetch(this.apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${this.apiKey}`
            },
            body: JSON.stringify({
                model: 'deepseek-chat',
                messages: messages,
                temperature: 0.5,
                max_tokens: 300
            })
        });

        if (!response.ok) {
            const error = await response.json();
            throw new Error(error.error?.message || 'API request failed');
        }

        const data = await response.json();
        let botMessage = data.choices[0]?.message?.content || 'Sorry, I could not generate a response.';

        // Remove any markdown formatting
        botMessage = botMessage
            .replace(/\*\*/g, '') // Remove bold markdown
            .replace(/\*/g, '') // Remove italic markdown
            .replace(/#{1,6}\s/g, '') // Remove headers
            .replace(/`/g, '') // Remove code backticks
            .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1'); // Remove markdown links, keep text

        // Update conversation history
        this.conversationHistory.push(
            { role: 'user', content: userMessage },
            { role: 'assistant', content: botMessage }
        );

        // Keep conversation history manageable (last 10 exchanges)
        if (this.conversationHistory.length > 20) {
            this.conversationHistory = this.conversationHistory.slice(-20);
        }

        return botMessage;
    }

    buildContext(userMessage) {
        // Simple keyword-based context retrieval
        const lowerMessage = userMessage.toLowerCase();
        let relevantContext = '';

        // Check for education-related queries
        if (lowerMessage.includes('education') || lowerMessage.includes('degree') || lowerMessage.includes('university') || lowerMessage.includes('school')) {
            relevantContext += this.extractEducationInfo() + '\n\n';
        }

        // Check for project-related queries
        if (lowerMessage.includes('project') || lowerMessage.includes('work') || lowerMessage.includes('github')) {
            relevantContext += this.extractProjectInfo() + '\n\n';
        }

        // Check for skill-related queries
        if (lowerMessage.includes('skill') || lowerMessage.includes('technology') || lowerMessage.includes('tech')) {
            relevantContext += this.extractSkillInfo() + '\n\n';
        }

        // Build fallback context
        const fallbackContext = [];
        if (this.resumeData && !this.resumeData.includes('not available') && !this.resumeData.includes('could not be loaded')) {
            fallbackContext.push(this.resumeData);
        }
        if (this.websiteData) {
            fallbackContext.push(this.websiteData);
        }
        return relevantContext || fallbackContext.join('\n\n');
    }

    extractEducationInfo() {
        const qualSection = document.querySelector('#qualifications');
        return qualSection ? qualSection.innerText : '';
    }

    extractProjectInfo() {
        const projects = Array.from(document.querySelectorAll('.project-card, .featured-lab-card'));
        return projects.map(p => p.innerText).join('\n\n');
    }

    extractSkillInfo() {
        const skillsSection = document.querySelector('#skills');
        return skillsSection ? skillsSection.innerText : '';
    }

    addMessageToUI(message, sender) {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return;

        const messageDiv = document.createElement('div');
        messageDiv.className = `chatbot-message ${sender}`;

        const messageContent = document.createElement('div');
        messageContent.className = 'chatbot-message-content';
        messageContent.textContent = message;

        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);

        // Scroll to bottom
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    showMessage(message, sender) {
        this.addMessageToUI(message, sender);
    }

    showTypingIndicator() {
        const messagesContainer = document.getElementById('chatbot-messages');
        if (!messagesContainer) return null;

        const typingDiv = document.createElement('div');
        typingDiv.className = 'chatbot-message bot typing';
        typingDiv.id = 'typing-indicator';
        typingDiv.innerHTML = `
            <div class="chatbot-message-content">
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
                <span class="typing-dot"></span>
            </div>
        `;

        messagesContainer.appendChild(typingDiv);
        messagesContainer.scrollTop = messagesContainer.scrollHeight;

        return 'typing-indicator';
    }

    removeTypingIndicator(id) {
        const indicator = document.getElementById(id);
        if (indicator) {
            indicator.remove();
        }
    }

    // Method to set API key (can be called from HTML or config)
    setApiKey(key) {
        this.apiKey = key;
        // Store in localStorage for persistence
        if (typeof Storage !== 'undefined') {
            localStorage.setItem('deepseek_api_key', key);
        }
    }

    // Load API key from localStorage
    loadApiKey() {
        if (typeof Storage !== 'undefined') {
            const savedKey = localStorage.getItem('deepseek_api_key');
            if (savedKey) {
                this.apiKey = savedKey;
            }
        }
    }
}

    // Initialize chatbot when DOM is ready
let chatbot;
document.addEventListener('DOMContentLoaded', () => {
    chatbot = new PortfolioChatbot();
    chatbot.loadApiKey();
    
    // If API key is not set, show a message in console (for development)
    if (!chatbot.apiKey) {
        console.warn('DeepSeek API key not found. Please set DEEPSEEK_API_KEY environment variable in Railway.');
        console.info('For local development, you can set it via: chatbot.setApiKey("your-key")');
    } else {
        console.log('Chatbot API key loaded successfully');
    }
});

// Export for global access
window.PortfolioChatbot = PortfolioChatbot;
window.chatbot = chatbot;

