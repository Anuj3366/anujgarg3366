
import SkillCategory from "./SkillCategory";
import { skillCategories } from "../data/skillsData";
import SectionHeader from "./SectionHeader";
import { Code } from "lucide-react";

const Skills = () => {
  return (
    <section id="skills" className="section-spacing">
      <div className="container mx-auto container-spacing">
        <SectionHeader
          badge={
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/20 border border-primary/40 mb-4 sm:mb-6">
              <Code className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-bold text-primary">Technical Expertise</span>
            </div>
          }
          title="Skills & Technologies"
          description="A comprehensive overview of my technical skills and expertise across different domains"
        />
        
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
            <p className="text-black/70 dark:text-white/70 text-xs md:text-sm">
              <span className="font-semibold text-black dark:text-white">Specialization:</span> iOS Development with Swift & SwiftUI, 
              Full-Stack Web Development, and competitive programming across multiple platforms.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
