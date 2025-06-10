
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import SkillBadge from "./SkillBadge";

interface SkillCategoryProps {
  title: string;
  skills: string[];
  index: number;
}

const SkillCategory = ({ title, skills, index }: SkillCategoryProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      viewport={{ once: true }}
    >
      <Card className="h-full bg-card/50 backdrop-blur-sm border-primary/10 hover:border-primary/20 transition-all duration-300">
        <CardContent className="p-4 md:p-6">
          <h3 className="mb-3 md:mb-4 text-base md:text-lg font-medium">
            {title}
          </h3>
          <div className="flex flex-wrap gap-2">
            {skills.map((skill) => (
              <SkillBadge key={skill} skill={skill} />
            ))}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default SkillCategory;
