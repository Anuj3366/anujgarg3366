
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Code } from "lucide-react";

const Skills = () => {
  const skillCategories = [
    {
      title: "Programming Languages",
      skills: ["Java", "Python", "C++", "JavaScript", "Swift"],
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
    {
      title: "Problem Solving",
      skills: ["Data Structures", "Algorithms", "Dynamic Programming", "Graph Algorithms", "Optimization"],
    },
  ];

  return (
    <section
      id="skills"
      className="py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-6 text-center text-3xl font-bold sm:text-4xl">
          Skills
        </h2>
        
        <div className="mx-auto max-w-4xl">
          <motion.div 
            className="code-container mb-10 overflow-hidden rounded-lg bg-card/50 p-6 backdrop-blur-sm border border-primary/10 shadow-lg"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <Code className="text-primary h-5 w-5" />
                <span className="text-sm font-medium">anuj.js</span>
              </div>
              <div className="flex gap-1.5">
                <div className="h-3 w-3 rounded-full bg-red-500"></div>
                <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                <div className="h-3 w-3 rounded-full bg-green-500"></div>
              </div>
            </div>
            <pre className="overflow-x-auto text-sm">
              <code>
                {`const anuj = {
    pronouns: "he" | "him",
    languages: ["JavaScript", "Java", "Python", "C++", "Life"],
    askMeAbout: ["web dev", "tech", "DSA", "coffee"],
    technologies: {
        frontEnd: {
            js: ["React", "Next.js"],
            css: ["Tailwind", "Bootstrap", "Material UI"]
        },
        backEnd: {
            js: ["Node", "Express"],
            python: ["Django"]
        },
        databases: ["MongoDB", "PostgreSQL", "Firebase"],
        misc: ["Docker", "Git", "AWS"]
    },
    currentFocus: "Building cool full-stack applications",
    funFact: "There are two ways to write error-free programs; only the third one works"
};`}
              </code>
            </pre>
            <div className="flex justify-end mt-3">
              <span className="text-xs text-muted-foreground">// Easily update this code to reflect your current skills</span>
            </div>
          </motion.div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300 h-full">
                  <CardContent className="p-6">
                    <h3 className="mb-4 text-lg font-medium">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary hover:bg-primary/15 transition-colors duration-200 cursor-default"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
          
          <div className="mt-10 text-center">
            <p className="text-muted-foreground text-sm">
              <span className="font-medium">Pro tip:</span> This skills section is easily customizable. 
              You can update the skillCategories array to add, remove, or modify your skills, 
              and the code snippet to reflect your current tech journey.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
