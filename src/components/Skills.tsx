import SkillCategory from "./SkillCategory";
import { skillCategories } from "../data/skillsData";
import SectionHeader from "./SectionHeader";
import { Code } from "lucide-react";

const Skills = () => {
  return (
    <section id="skills" className="section-spacing pb-24 md:pb-32 lg:pb-40 relative z-10">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-12 md:mb-16">
            {skillCategories.map((category, index) => (
              <SkillCategory
                key={`${category.title}-${index}`}
                title={category.title}
                skills={category.skills}
                index={index}
              />
            ))}
          </div>
          
          {/* Technical Specialization section without background */}
          <div className="mt-12 md:mt-16 mb-16 md:mb-20 text-center">
            <h4 className="text-xl md:text-2xl font-bold text-black dark:text-white mb-4 md:mb-6">
              Technical Specialization
            </h4>
            <div className="h-1 w-24 bg-gradient-to-r from-primary to-primary/60 rounded-full mx-auto mb-6"></div>
            <p className="text-black/90 dark:text-white/90 text-base md:text-lg leading-relaxed max-w-2xl mx-auto">
              <span className="font-bold text-primary text-lg">Core Focus:</span> iOS Development with Swift &amp; SwiftUI, 
              Full-Stack Web Development with modern frameworks, and competitive programming across multiple platforms 
              including LeetCode, CodeChef, and Codeforces.
            </p>
          </div>
          
          {/* Additional safety spacing */}
          <div className="h-8 md:h-12"></div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
