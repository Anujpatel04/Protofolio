# Railway Deployment Guide

## Quick Deploy Steps

### 1. Connect to Railway

1. Go to [Railway](https://railway.app)
2. Sign up/Login with GitHub
3. Click **"New Project"**
4. Select **"Deploy from GitHub repo"**
5. Choose your repository

### 2. Automatic Deployment

Railway will automatically:
- Detect this is a static site
- Use the `package.json` configuration
- Deploy using `npx serve`
- Assign a public URL

### 3. Configure (Optional)

#### Custom Domain
1. Go to your project settings
2. Click **"Domains"**
3. Add your custom domain
4. Update DNS records as shown

#### Environment Variables
No environment variables needed - the chatbot API key is managed client-side.

### 4. Verify Deployment

1. Visit your Railway URL
2. Check that the site loads correctly
3. Test the chatbot (requires API key)

## File Structure for Deployment

```
✅ Required Files:
- index.html
- package.json
- railway.json (or nixpacks.toml)
- assets/ (all assets folder)
- CNAME (if using custom domain)

❌ Excluded (via .railwayignore):
- extract_resume.py
- Documentation files
- Data/ folder
- Development files
```

## Troubleshooting

### Build Fails
- Check Railway logs
- Ensure `package.json` is valid
- Verify Node.js version (18+)

### Site Not Loading
- Check that `index.html` is in root
- Verify asset paths are relative
- Check Railway logs for errors

### Chatbot Not Working
- Ensure API key is set in browser
- Check browser console for errors
- Verify `assets/data/` files exist

## Railway Configuration

The project uses:
- **Builder**: Nixpacks (auto-detected)
- **Start Command**: `npx serve -s . -l $PORT`
- **Port**: Automatically set by Railway

## Post-Deployment

1. Test all pages and features
2. Set up custom domain (if needed)
3. Configure chatbot API key
4. Monitor Railway dashboard for issues

