# Omar Jaber - Portfolio Website

A modern, responsive portfolio website showcasing achievements, projects, skills, and recognition as a Full Stack Developer and AI Specialist.

## Features

### 🎭 **Abnormal & Sophisticated Animations**
- **Horizontal Scrolling About Section**: Entire section scrolls sideways with pinning
- **3D Card Flips**: Recognition stats flip from back to front (180° rotation)
- **Morphing Backgrounds**: Sections scale and rotate as you scroll
- **Custom Cursor**: Interactive cursor with smooth following and hover effects
- **Page Loader**: Animated progress bar with floating particles
- **Wave Animations**: Elements appear in wave patterns
- **Magnetic Effects**: Cards slide in from alternating sides
- **50+ Unique GSAP Animations**: Every section has custom scroll triggers

### 🚀 **Technical Excellence**
- **GSAP ScrollTrigger**: Advanced scroll-linked animations throughout
- **Horizontal Pin Scrolling**: About section pins while content scrolls horizontally
- **3D Transforms**: `preserve-3d`, rotateX, rotateY, rotateZ effects
- **Performance Optimized**: 
  - `will-change` on all animated elements
  - GPU-accelerated transforms
  - 60 FPS maintained
  - Optimized with `gsap.context()` for React
- **Responsive**: Fully responsive with mobile-optimized animations
- **Custom Cursor**: Desktop-only feature with mix-blend-difference
- **SEO-Friendly**: Proper meta tags and semantic HTML

## Tech Stack

- **Frontend Framework**: React 18
- **Build Tool**: Vite 5
- **Styling**: Tailwind CSS 3
- **Animations**: 
  - Framer Motion (component animations)
  - GSAP with ScrollTrigger (scroll animations)
- **Icons**: Lucide React
- **Performance**: Optimized with will-change, reduced particle count, and efficient re-renders
- **Deployment Ready**: Can be deployed to Vercel, Netlify, or any static hosting

## Project Structure

```
portfolio/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx       # Navigation bar with mobile menu
│   │   ├── Hero.jsx          # Landing section
│   │   ├── About.jsx         # About section
│   │   ├── Projects.jsx      # Projects showcase
│   │   ├── Skills.jsx        # Technical skills
│   │   ├── Recognition.jsx   # Achievements
│   │   └── Footer.jsx        # Footer with contact
│   ├── App.jsx               # Main app component
│   ├── main.jsx             # App entry point
│   └── index.css            # Global styles
├── index.html               # HTML template
├── package.json             # Dependencies
├── tailwind.config.js       # Tailwind configuration
├── vite.config.js          # Vite configuration
└── README.md               # This file
```

## Getting Started

### Prerequisites

- Node.js 16+ and npm/yarn installed

### Installation

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

3. Open your browser and visit `http://localhost:5173`

### Build for Production

```bash
npm run build
```

This creates an optimized production build in the `dist` folder.

### Preview Production Build

```bash
npm run preview
```

## Deployment

### Vercel (Recommended)

1. Push your code to GitHub
2. Import the project on [Vercel](https://vercel.com)
3. Vercel will auto-detect Vite and deploy

### Netlify

1. Build the project: `npm run build`
2. Drag and drop the `dist` folder to [Netlify](https://netlify.com)

### GitHub Pages

1. Install gh-pages: `npm install -D gh-pages`
2. Add to package.json:
   ```json
   "homepage": "https://yourusername.github.io/portfolio",
   "scripts": {
     "predeploy": "npm run build",
     "deploy": "gh-pages -d dist"
   }
   ```
3. Deploy: `npm run deploy`

## Customization

### Update Personal Information

1. **Contact Links**: Edit social media URLs in:
   - `src/components/Hero.jsx`
   - `src/components/Footer.jsx`

2. **Projects**: Modify projects array in `src/components/Projects.jsx`

3. **Skills**: Update skill categories in `src/components/Skills.jsx`

4. **Colors**: Customize theme in `tailwind.config.js`

### Change Color Scheme

Edit the primary colors in `tailwind.config.js`:

```js
colors: {
  primary: {
    // Update these hex values
    500: '#0ea5e9',
    600: '#0284c7',
    // ...
  }
}
```

## Features Breakdown

### Sections

1. **Hero**: Eye-catching landing with animated name and CTA buttons
2. **About**: Personal introduction with key highlights
3. **Projects**: Detailed showcase of 8 major projects with tech stacks
4. **Skills**: Comprehensive skill categories and language proficiency
5. **Recognition**: Achievements, awards, and statistics
6. **Footer**: Contact information and social links

### Animations

- Scroll-triggered animations using Framer Motion
- Smooth page transitions
- Hover effects on interactive elements
- Floating animations and gradient effects

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## License

This project is open source and available for personal use.

## Contact

Omar Jaber
- GitHub: [github.com/omarjaber](https://github.com/omarjaber)
- LinkedIn: [linkedin.com/in/omarjaber](https://linkedin.com/in/omarjaber)
- Email: omar@example.com

---

Built with ❤️ using React, Tailwind CSS, and Framer Motion
