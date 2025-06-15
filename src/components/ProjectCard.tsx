
import { motion } from "framer-motion";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, ExternalLink, Sparkles } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import { Project } from "@/data/projectsData";

interface ProjectCardProps {
  project: Project;
}

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

const ProjectCard = ({ project }: ProjectCardProps) => {
  return (
    <motion.div
      variants={cardVariants}
      className="group"
      whileHover={{ y: -8 }}
      transition={{ type: "spring", stiffness: 300 }}
    >
      <Card className="relative overflow-hidden bg-white/90 dark:bg-gray-900/90 backdrop-blur-sm border-2 border-border/60 hover:border-primary/40 h-full flex flex-col transition-all duration-500 hover:shadow-2xl hover:shadow-primary/10">
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
          <CardTitle className="text-lg sm:text-xl font-bold text-black dark:text-white group-hover:text-primary transition-colors">
            {project.title}
          </CardTitle>
        </CardHeader>
        
        <CardContent className="flex-grow pb-3 sm:pb-4">
          <p className="text-sm sm:text-base text-black/80 dark:text-white/80 mb-4 sm:mb-6 leading-relaxed">{project.description}</p>
          <div className="flex flex-wrap gap-1.5 sm:gap-2">
            {project.technologies.map((tech) => (
              <Badge 
                key={tech} 
                variant="secondary"
                className="text-xs bg-primary/20 border border-primary/40 text-black dark:text-white hover:bg-primary/30 transition-colors"
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
  );
};

export default ProjectCard;
