
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { User, Target } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import AboutContent from "./AboutContent";
import AboutFacts from "./AboutFacts";
import MissionObjectives from "./MissionObjectives";

const About = () => {
  return (
    <section id="about" className="section-spacing">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="container mx-auto container-spacing"
      >
        <div className="text-center mb-8 sm:mb-12 lg:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-4 sm:mb-6"
          >
            <User className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
            <span className="text-xs sm:text-sm font-semibold text-accent">Get to Know Me</span>
          </motion.div>
          
          <h2 className="section-headline">
            About Me
          </h2>
          <p className="text-responsive-base text-muted-foreground max-w-2xl mx-auto">
            Passionate developer with a love for creating innovative solutions and beautiful user experiences
          </p>
        </div>
        
        <div className="grid grid-cols-1 gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Card className="h-full overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2 border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-xl">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <AboutContent />
                <AboutFacts />
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="h-full overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                <div className="relative overflow-hidden rounded-2xl mb-4 sm:mb-6 lg:mb-8 group w-full max-w-sm">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <OptimizedImage
                    src="https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif"
                    alt="Coding Animation"
                    className="h-auto w-full transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                <div className="text-center w-full">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-3 sm:mb-4">
                    <Target className="h-3 w-3 text-primary" />
                    <span className="text-xs font-semibold text-primary">Mission & Goals</span>
                  </div>
                  <MissionObjectives />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
