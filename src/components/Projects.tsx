
import { motion } from "framer-motion";
import { projects } from "@/data/projectsData";
import ProjectCard from "./ProjectCard";
import SectionHeader from "./SectionHeader";
import { Sparkles } from "lucide-react";

const Projects = () => {
  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.1
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
          <SectionHeader
            badge={
              <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-4 sm:mb-6">
                <Sparkles className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
                <span className="text-xs sm:text-sm font-semibold text-primary">Featured Work</span>
              </div>
            }
            title="Projects & Portfolio"
            description="A showcase of my latest work and creative solutions to real-world problems"
          />
          
          <motion.div 
            className="grid grid-cols-1 gap-6 sm:gap-8 md:grid-cols-2"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {projects.map((project, index) => (
              <ProjectCard key={index} project={project} />
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Projects;
