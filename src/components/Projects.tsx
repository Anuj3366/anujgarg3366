import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";

const projects = [
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

const Projects = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { 
      opacity: 0, 
      y: 50,
      scale: 0.9 
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        type: "spring", 
        stiffness: 100, 
        damping: 15 
      } 
    }
  };

  return (
    <section id="projects" className="section-spacing">
      <div className="container mx-auto container-spacing">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <div className="text-center mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6"
            >
              <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-semibold text-primary">Featured Work</span>
            </motion.div>
            
            <h2 className="section-headline">
              Projects & Portfolio
            </h2>
            <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto">
              A showcase of my latest work and creative solutions to real-world problems
            </p>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <motion.div
                key={index}
                variants={cardVariants}
                className="group"
                whileHover={{ y: -8 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Card className="relative overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
                  {project.featured && (
                    <motion.div 
                      className="absolute top-3 sm:top-4 right-3 sm:right-4 z-10"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.5, type: "spring", stiffness: 200 }}
                    >
                      <div className="flex items-center gap-1 px-2 sm:px-3 py-1 rounded-full bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 backdrop-blur-sm">
                        <Sparkles className="h-2.5 w-2.5 sm:h-3 sm:w-3 text-yellow-600" />
                        <span className="text-xs font-bold text-yellow-700 dark:text-yellow-300">Featured</span>
                      </div>
                    </motion.div>
                  )}
                  
                  <div className="relative aspect-video overflow-hidden">
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent z-10"></div>
                    <OptimizedImage
                      src={project.imageUrl}
                      alt={`${project.title} preview`}
                      className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    />
                  </div>
                  
                  <CardHeader className="pb-3 sm:pb-4">
                    <CardTitle className="text-lg sm:text-xl font-bold group-hover:text-primary transition-colors">
                      {project.title}
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent className="flex-grow pb-3 sm:pb-4">
                    <p className="text-sm sm:text-base text-foreground/80 mb-4 sm:mb-6 leading-relaxed">{project.description}</p>
                    <div className="flex flex-wrap gap-1.5 sm:gap-2">
                      {project.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary"
                          className="text-xs bg-secondary/50 hover:bg-secondary/80 transition-colors border border-border/50"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                  
                  <CardFooter className="flex gap-2 sm:gap-3 pt-3 sm:pt-4">
                    <Button 
                      asChild 
                      variant="outline" 
                      size="sm"
                      className="flex-1 group/btn hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300"
                    >
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                        aria-label={`View ${project.title} source code on GitHub`}
                      >
                        <Github className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover/btn:scale-110" />
                        Code
                      </a>
                    </Button>
                    <Button 
                      asChild 
                      size="sm"
                      className="flex-1 bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 shadow-lg hover:shadow-xl transition-all duration-300 group/btn"
                    >
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center gap-1.5 sm:gap-2 text-xs sm:text-sm"
                        aria-label={`View ${project.title} live demo`}
                      >
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 transition-transform group-hover/btn:scale-110" />
                        Demo
                      </a>
                    </Button>
                  </CardFooter>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
