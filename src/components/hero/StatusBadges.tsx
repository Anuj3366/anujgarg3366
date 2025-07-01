
import { motion } from "framer-motion";
import { memo } from "react";

interface StatusBadgesProps {
  variants: any;
}

const StatusBadges = memo<StatusBadgesProps>(({ variants }) => {
  return (
    <motion.div
      className="flex flex-col sm:flex-row flex-wrap items-center justify-center gap-2 sm:gap-3 mb-4 sm:mb-6 lg:mb-8 w-full max-w-2xl"
      variants={variants}
    >
      <div className="group relative overflow-hidden rounded-full bg-gradient-to-r from-emerald-500/10 to-blue-500/10 border border-emerald-500/20 dark:border-emerald-400/30 px-3 py-2 sm:px-4 sm:py-2 backdrop-blur-sm hover:scale-105 transition-all duration-300">
        <span className="relative text-xs sm:text-sm font-bold text-emerald-700 dark:text-emerald-300 text-center block">
          🎓 B.E. CSE @ Chitkara Univ. (9.39 CGPA)
        </span>
      </div>
      <div className="group relative overflow-hidden rounded-full bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 dark:border-purple-400/30 px-3 py-2 sm:px-4 sm:py-2 backdrop-blur-sm hover:scale-105 transition-all duration-300">
        <span className="relative text-xs sm:text-sm font-bold text-purple-700 dark:text-purple-300 text-center block">
          💼 Tech Intern @ OLX
        </span>
      </div>
    </motion.div>
  );
});

StatusBadges.displayName = "StatusBadges";

export default StatusBadges;
