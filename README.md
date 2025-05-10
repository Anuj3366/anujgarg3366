
# Anuj Garg Portfolio

A modern, responsive portfolio website built with React, TypeScript, and Tailwind CSS.

## Features

- Responsive design that works on all devices
- Progressive Web App (PWA) capabilities for offline access
- Animated components using Framer Motion
- Clean and modern UI with Tailwind CSS
- Easy to update content and information

## How to Update Content

### Updating Personal Information

Edit these files to update your personal information:

- `src/components/Hero.tsx` - Update name, title, and links
- `src/components/About.tsx` - Update your bio and quick facts
- `src/components/Experience.tsx` - Update work experience and education

### Updating Skills

To update your skills, edit the `skillCategories` array in `src/components/Skills.tsx`:

```tsx
const skillCategories = [
  {
    title: "Category Name",
    skills: ["Skill 1", "Skill 2", "Skill 3"]
  },
  // Add more categories or modify existing ones
];
```

### Updating Projects

To update your projects, edit the `projects` array in `src/components/Projects.tsx`:

```tsx
const projects = [
  {
    title: "Project Title",
    description: "Project description",
    technologies: ["Tech 1", "Tech 2", "Tech 3"],
    githubUrl: "https://github.com/yourusername/project",
    liveUrl: "https://project-demo.com",
    imageUrl: "path/to/image.jpg",
  },
  // Add more projects or modify existing ones
];
```

### Updating Contact Information

Edit `src/components/Contact.tsx` to update your contact information and form settings.

## PWA Configuration

The site is configured as a Progressive Web App. To update the PWA configuration:

1. Edit `public/manifest.json` to change app name, colors, etc.
2. Replace icon files in the `public/icons` directory with your own (maintaining the same filenames and dimensions).

## Development

### Prerequisites

- Node.js (v14 or later)
- npm or yarn

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/your-portfolio-repo.git

# Install dependencies
npm install
# or
yarn install

# Start the development server
npm run dev
# or
yarn dev
```

### Build for Production

```bash
npm run build
# or
yarn build
```

The built files will be in the `dist` directory, ready to be deployed.

## Deployment

This site can be deployed to any static site hosting service like Netlify, Vercel, GitHub Pages, etc.

For GitHub Pages deployment:

1. Update the `base` property in `vite.config.ts` to match your repository name:
   ```ts
   base: '/your-repo-name/'
   ```

2. Run the build command and push the `dist` folder to the `gh-pages` branch.

## License

[MIT](LICENSE)
