
import { cn } from "@/lib/utils";

interface NavLinkProps {
  title: string;
  href: string;
  isActive: boolean;
  onClick: (href: string) => void;
}

const NavLink = ({ title, href, isActive, onClick }: NavLinkProps) => {
  return (
    <button
      onClick={() => onClick(href)}
      className={cn(
        "relative text-gray-700 dark:text-foreground/80 hover:text-primary transition-all duration-300 font-medium group py-2 px-3 xl:px-4 focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-lg text-sm xl:text-base hover:scale-105 active:scale-95",
        isActive &&
          "text-primary font-semibold bg-primary/5 shadow focus:ring-2 focus:ring-primary",
      )}
    >
      {title}
      <span
        className={cn(
          "absolute bottom-0 left-3 right-3 h-0.5 bg-gradient-to-r from-primary to-accent transition-all duration-300 rounded-full",
          isActive
            ? "scale-x-100"
            : "scale-x-0 group-hover:scale-x-100"
        )}
      ></span>
    </button>
  );
};

export default NavLink;
