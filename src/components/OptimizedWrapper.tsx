
import { memo, ReactNode, useMemo } from 'react';
import { motion, MotionProps } from 'framer-motion';

interface OptimizedWrapperProps {
  children: ReactNode;
  className?: string;
  animate?: boolean;
  delay?: number;
  duration?: number;
  as?: keyof HTMLElementTagNameMap;
  motionProps?: MotionProps;
}

const OptimizedWrapper = memo<OptimizedWrapperProps>(({
  children,
  className = '',
  animate = true,
  delay = 0,
  duration = 0.6,
  as: Element = 'div',
  motionProps = {}
}) => {
  // Memoized animation variants
  const variants = useMemo(() => ({
    hidden: { 
      opacity: 0, 
      y: 20,
      scale: 0.98
    },
    visible: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      transition: { 
        duration,
        delay,
        ease: "easeOut"
      }
    }
  }), [delay, duration]);

  if (!animate) {
    const Component = Element as any;
    return <Component className={className}>{children}</Component>;
  }

  const MotionComponent = motion[Element as keyof typeof motion] as any;

  return (
    <MotionComponent
      className={className}
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: '-50px' }}
      {...motionProps}
    >
      {children}
    </MotionComponent>
  );
});

OptimizedWrapper.displayName = 'OptimizedWrapper';

export default OptimizedWrapper;
