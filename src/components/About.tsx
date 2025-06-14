
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { User, Target } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import AboutContent from "./AboutContent";
import AboutFacts from "./AboutFacts";
import MissionObjectives from "./MissionObjectives";

const About = () => {
  return (
    <section id="about" className="py-16 sm:py-24 lg:py-28">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
      >
        <div className="text-center mb-12 sm:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 border border-accent/20 mb-6"
          >
            <User className="h-4 w-4 text-accent" />
            <span className="text-sm font-semibold text-accent">Get to Know Me</span>
          </motion.div>
          
          <h2 className="section-headline">
            About Me
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Passionate developer with a love for creating innovative solutions and beautiful user experiences
          </p>
        </div>
        
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:gap-8 lg:grid-cols-5">
          <div className="lg:col-span-3">
            <Card className="h-full overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2 border-border/50 hover:border-accent/30 transition-all duration-500 hover:shadow-xl">
              <CardContent className="p-6 sm:p-8">
                <AboutContent />
                <AboutFacts />
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card className="h-full overflow-hidden bg-gradient-to-br from-card/80 to-card/40 backdrop-blur-sm border-2 border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl">
              <CardContent className="flex flex-col items-center justify-center p-6 sm:p-8">
                <div className="relative overflow-hidden rounded-2xl mb-6 sm:mb-8 group">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"></div>
                  <OptimizedImage
                    src="https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif"
                    alt="Coding Animation"
                    className="h-auto w-full transform transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                
                <div className="text-center">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 mb-4">
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
