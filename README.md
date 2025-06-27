# My Projects Portfolio

A React-based GitHub Pages website showcasing my projects, starting with tax-related learning tools.

## 🚀 Features

- Modern React + TypeScript setup
- Responsive design with project previews
- GitHub Pages deployment
- Vite for fast development and building
- Links to GitHub profile and repositories
- Proper copyright disclaimers and license information

## 🛠️ Development

### Prerequisites
- Node.js (18 or higher)
- npm

### Getting Started

1. Clone this repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## 📦 Building and Deployment

### Build for production:
```bash
npm run build
```

### Deploy to GitHub Pages:
```bash
npm run deploy
```

## 🔄 Automatic Deployment

This project includes a GitHub Actions workflow that automatically builds and deploys to GitHub Pages when you push to the main branch.

## 📁 Project Structure

```
├── src/
│   ├── App.tsx          # Main React component
│   ├── App.css          # Styling
│   ├── main.tsx         # React entry point
│   └── index.css        # Global styles
├── public/
│   └── favicon.svg      # Website icon
├── .github/workflows/
│   └── deploy.yml       # GitHub Actions deployment
├── index.html           # HTML template
├── vite.config.ts       # Vite configuration
└── package.json         # Dependencies and scripts
```

## 🎨 Customization

- Update the content in `src/App.tsx` to match your projects
- Modify styles in `src/App.css` and `src/index.css`
- Replace the favicon in `public/favicon.svg`
- Update contact information and project links

## 📝 Projects Featured

- **Tax Calculator Tool**: Learning-focused tax calculation application with interactive preview
- **Tax Education Platform**: Interactive tutorials for tax concepts with educational interface preview
- **Future Projects**: More educational and practical tools coming soon
- All projects link to GitHub profile: https://github.com/jasonschurawel
- Individual project licenses available on respective repository pages

## 🔒 Copyright & Licensing

- Website design and content: © 2025 Jason Schurawel. All rights reserved.
- Individual projects may have different licenses - check each repository for details
- Built with React and hosted on GitHub Pages

## 🌐 Live Demo

Visit the live website at: `https://[your-username].github.io`
