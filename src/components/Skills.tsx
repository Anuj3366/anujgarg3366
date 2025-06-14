
import { motion } from "framer-motion";
import SkillCategory from "./SkillCategory";
import { skillCategories } from "../data/skillsData";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";

const Skills = () => {
  const skillsRef = useScrollAnimation({
    threshold: 0.2,
    onIntersect: (isVisible) => {
      if (isVisible) {
        console.log('Skills section is now visible');
      }
    }
  });

  return (
    <section id="skills" className="py-12 sm:py-16 md:py-20" ref={skillsRef}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container px-4 sm:px-6 md:px-8"
      >
        <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Technical Skills
        </h2>
        
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, index) => (
              <SkillCategory
                key={`${category.title}-${index}`}
                title={category.title}
                skills={category.skills}
                index={index}
              />
            ))}
          </div>
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-xs md:text-sm">
              <span className="font-medium">Specialization:</span> iOS Development with Swift & SwiftUI, 
              Full-Stack Web Development, and competitive programming across multiple platforms.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
