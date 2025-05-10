
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
          <div className="code-container mb-10 overflow-hidden rounded-lg bg-card/50 p-6 backdrop-blur-sm">
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
          </div>
          
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {skillCategories.map((category) => (
              <Card key={category.title} className="bg-card/50 backdrop-blur-sm">
                <CardContent className="p-6">
                  <h3 className="mb-4 text-lg font-medium">{category.title}</h3>
                  <div className="flex flex-wrap gap-2">
                    {category.skills.map((skill) => (
                      <span
                        key={skill}
                        className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Skills;
