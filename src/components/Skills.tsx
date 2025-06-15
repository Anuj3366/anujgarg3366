
import SkillCategory from "./SkillCategory";
import { skillCategories } from "../data/skillsData";
import SectionHeader from "./SectionHeader";
import { Code } from "lucide-react";

const Skills = () => {
  return (
    <section id="skills" className="section-spacing pb-16 md:pb-20 lg:pb-24">
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
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 mb-8 md:mb-12">
            {skillCategories.map((category, index) => (
              <SkillCategory
                key={`${category.title}-${index}`}
                title={category.title}
                skills={category.skills}
                index={index}
              />
            ))}
          </div>
          
          <div className="mt-8 md:mt-12 pb-8 md:pb-12 text-center bg-gradient-to-r from-primary/5 via-primary/10 to-primary/5 rounded-lg p-6 md:p-8 border border-primary/20">
            <div className="max-w-3xl mx-auto">
              <h4 className="text-lg md:text-xl font-semibold text-black dark:text-white mb-3 md:mb-4">
                Technical Specialization
              </h4>
              <p className="text-black/80 dark:text-white/80 text-sm md:text-base leading-relaxed">
                <span className="font-semibold text-primary">Core Focus:</span> iOS Development with Swift & SwiftUI, 
                Full-Stack Web Development with modern frameworks, and competitive programming across multiple platforms 
                including LeetCode, CodeChef, and Codeforces.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;
