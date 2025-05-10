
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink } from "lucide-react";

const projects = [
  {
    title: "Personal Portfolio",
    description: "A modern, responsive portfolio website built with React and Tailwind CSS. Features smooth animations, dark mode, and interactive elements.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion"],
    githubUrl: "https://github.com/Anuj3366/Anuj3366.github.io",
    liveUrl: "https://anujgarg3366.me",
    imageUrl: "https://user-images.githubusercontent.com/74038190/238353480-219bcc70-f5dc-466b-9a60-29653d8e8433.gif",
  },
  {
    title: "E-Commerce Platform",
    description: "Full-stack e-commerce application with product listings, cart functionality, user authentication, and payment processing.",
    technologies: ["Next.js", "MongoDB", "Express", "Node.js", "Stripe API"],
    githubUrl: "https://github.com/Anuj3366",
    liveUrl: "#",
    imageUrl: "https://user-images.githubusercontent.com/74038190/219923809-b86dc415-a0c2-4a38-bc88-ad6cf06395a8.gif",
  },
  {
    title: "Task Manager Application",
    description: "A productivity app that helps users manage tasks with features like drag-and-drop organization, priority levels, and reminders.",
    technologies: ["React", "Firebase", "Material UI", "React DnD"],
    githubUrl: "https://github.com/Anuj3366",
    liveUrl: "#",
    imageUrl: "https://user-images.githubusercontent.com/74038190/212749447-bfb7e725-6987-49d9-ae85-2015e3e7cc41.gif",
  },
  {
    title: "Weather Dashboard",
    description: "Real-time weather application that provides current conditions, forecasts, and historical data for locations worldwide.",
    technologies: ["JavaScript", "OpenWeather API", "Chart.js", "Bootstrap"],
    githubUrl: "https://github.com/Anuj3366",
    liveUrl: "#",
    imageUrl: "https://user-images.githubusercontent.com/74038190/242390524-0c7eb6ed-663b-4ce2-bcd4-065fe5989978.gif",
  },
];

const Projects = () => {
  return (
    <section
      id="projects"
      className="py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-6 text-center text-3xl font-bold sm:text-4xl">
          Projects
        </h2>
        
        <div className="mx-auto max-w-6xl">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {projects.map((project, index) => (
              <Card
                key={index}
                className="group overflow-hidden bg-card/50 backdrop-blur-sm"
              >
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.imageUrl}
                    alt={project.title}
                    className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
                  />
                </div>
                
                <CardHeader>
                  <CardTitle>{project.title}</CardTitle>
                </CardHeader>
                
                <CardContent>
                  <p className="mb-4 text-foreground/80">{project.description}</p>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                
                <CardFooter className="flex gap-4">
                  <Button asChild variant="outline" size="sm">
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="h-4 w-4" />
                      Code
                    </a>
                  </Button>
                  <Button asChild size="sm">
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <ExternalLink className="h-4 w-4" />
                      Demo
                    </a>
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Projects;
