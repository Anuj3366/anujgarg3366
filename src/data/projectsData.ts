
export const projects = [
  {
    title: "Personal Portfolio",
    description: "A modern, responsive portfolio website built with React and Tailwind CSS. Features smooth animations, dark mode, and interactive elements.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/Anuj3366/Anuj3366.github.io",
    liveUrl: "https://anujgarg3366.me",
    imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce application with product listings, cart functionality, user authentication, and payment processing.",
    technologies: ["Next.js", "MongoDB", "Express", "Node.js", "Stripe API"],
    githubUrl: "https://github.com/Anuj3366",
    liveUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?auto=format&fit=crop&w=800&q=80",
    featured: true,
  },
  {
    title: "Task Manager Application",
    description: "A productivity app that helps users manage tasks with features like drag-and-drop organization, priority levels, and reminders.",
    technologies: ["React", "Firebase", "Material UI", "React DnD"],
    githubUrl: "https://github.com/Anuj3366",
    liveUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1611224923853-80b023f02d71?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application that provides current conditions, forecasts, and historical data for locations worldwide.",
    technologies: ["JavaScript", "OpenWeather API", "Chart.js", "Bootstrap"],
    githubUrl: "https://github.com/Anuj3366",
    liveUrl: "#",
    imageUrl: "https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?auto=format&fit=crop&w=800&q=80",
    featured: false,
  },
];

export type Project = typeof projects[0];
