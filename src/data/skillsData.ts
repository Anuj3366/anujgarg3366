
export interface SkillCategory {
  title: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    title: "iOS Development",
    skills: ["Swift", "Objective-C", "UIKit", "SwiftUI", "Xcode", "MVVM-C"],
  },
  {
    title: "Programming Languages",
    skills: ["Swift", "JavaScript", "Python", "Java", "C++"],
  },
  {
    title: "Frontend Technologies",
    skills: ["React", "Next.js", "Tailwind CSS", "Bootstrap", "Material UI"],
  },
  {
    title: "Backend Technologies",
    skills: ["Node.js", "Express", "Django", "RESTful APIs", "JSON/XML"],
  },
  {
    title: "Databases",
    skills: ["MongoDB", "MySQL", "SQL Server", "Firebase", "PostgreSQL"],
  },
  {
    title: "Cloud & DevOps",
    skills: ["AWS (EC2, S3)", "Docker", "Kubernetes", "CI/CD", "Git"],
  },
];
