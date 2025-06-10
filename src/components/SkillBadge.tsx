
interface SkillBadgeProps {
  skill: string;
}

const SkillBadge = ({ skill }: SkillBadgeProps) => {
  return (
    <span className="rounded-full bg-primary/10 px-2 py-1 text-xs md:text-sm font-medium text-primary hover:bg-primary/15 transition-colors duration-200 cursor-default">
      {skill}
    </span>
  );
};

export default SkillBadge;
