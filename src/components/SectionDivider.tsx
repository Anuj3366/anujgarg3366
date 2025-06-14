
import { memo, useMemo } from "react";

interface SectionDividerProps {
  variant?: 'primary' | 'accent';
  opacity?: number;
}

const SectionDivider = memo<SectionDividerProps>(({ variant = 'primary', opacity = 30 }) => {
  const gradientClass = useMemo(() => 
    variant === 'primary' 
      ? `from-transparent via-primary/${opacity} to-transparent`
      : `from-transparent via-accent/${opacity} to-transparent`,
    [variant, opacity]
  );

  return (
    <div className="my-6 sm:my-8 lg:my-12">
      <div className={`w-full h-px bg-gradient-to-r ${gradientClass}`} />
    </div>
  );
});

SectionDivider.displayName = "SectionDivider";

export default SectionDivider;
