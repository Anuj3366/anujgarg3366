
interface SkillBadgeProps {
  skill: string;
}

const SkillBadge = ({ skill }: SkillBadgeProps) => {
  return (
    <span className="rounded-full bg-primary/20 border border-primary/40 px-3 py-1.5 text-xs md:text-sm font-medium text-black dark:text-white hover:bg-primary/30 hover:border-primary/60 transition-all duration-200 cursor-default">
      {skill}
    </span>
  );
};

export default SkillBadge;
