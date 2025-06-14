
interface SectionDividerProps {
  variant?: 'primary' | 'accent';
  opacity?: number;
}

const SectionDivider = ({ variant = 'primary', opacity = 30 }: SectionDividerProps) => {
  const gradientClass = variant === 'primary' 
    ? `from-transparent via-primary/${opacity} to-transparent`
    : `from-transparent via-accent/${opacity} to-transparent`;

  return (
    <div className="my-6 sm:my-8 lg:my-12">
      <div className={`w-full h-px bg-gradient-to-r ${gradientClass}`} />
    </div>
  );
};

export default SectionDivider;
