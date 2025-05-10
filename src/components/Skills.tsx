
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

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
      className="py-12 sm:py-16 md:py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container px-4 sm:px-6 md:px-8"
      >
        <h2 className="mb-6 text-center text-2xl font-bold sm:text-3xl md:text-4xl">
          Skills
        </h2>
        
        <div className="mx-auto max-w-4xl">
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category, index) => (
              <motion.div
                key={category.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * index }}
                viewport={{ once: true }}
              >
                <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
                  <CardContent className="p-4 md:p-6">
                    <h3 className="mb-3 md:mb-4 text-base md:text-lg font-medium">{category.title}</h3>
                    <div className="flex flex-wrap gap-2">
                      {category.skills.map((skill) => (
                        <span
                          key={skill}
                          className="rounded-full bg-primary/10 px-2 py-1 text-xs md:text-sm font-medium text-primary hover:bg-primary/15 transition-colors duration-200 cursor-default"
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
          
          <div className="mt-8 text-center">
            <p className="text-muted-foreground text-xs md:text-sm">
              <span className="font-medium">Pro tip:</span> This skills section is easily customizable. 
              Update the skillCategories array to add, remove, or modify your skills anytime.
            </p>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
