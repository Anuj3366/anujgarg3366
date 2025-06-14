
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { User, Target } from "lucide-react";
import OptimizedImage from "@/components/OptimizedImage";
import AboutContent from "./AboutContent";
import AboutFacts from "./AboutFacts";
import MissionObjectives from "./MissionObjectives";
import SectionHeader from "./SectionHeader";

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
        <SectionHeader
          badge={
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-accent/20 border border-accent/40 mb-4 sm:mb-6">
              <User className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
              <span className="text-xs sm:text-sm font-bold text-accent">Get to Know Me</span>
            </div>
          }
          title="About Me"
          description="Passionate developer with a love for creating innovative solutions and beautiful user experiences"
        />
        
        <div className="grid grid-cols-1 gap-6 lg:gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2 order-2 lg:order-1">
            <Card className="h-full overflow-hidden bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-2 border-border/60 hover:border-accent/40 transition-all duration-500 hover:shadow-xl group">
              <CardContent className="p-4 sm:p-6 lg:p-8">
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <AboutContent />
                </motion.div>
                <motion.div
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6, delay: 0.4 }}
                  viewport={{ once: true }}
                >
                  <AboutFacts />
                </motion.div>
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1 order-1 lg:order-2">
            <Card className="h-full overflow-hidden bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-2 border-border/60 hover:border-primary/40 transition-all duration-500 hover:shadow-xl group">
              <CardContent className="flex flex-col items-center justify-center p-4 sm:p-6 lg:p-8">
                <motion.div 
                  className="relative overflow-hidden rounded-2xl mb-4 sm:mb-6 lg:mb-8 group/image w-full max-w-xs"
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.05 }}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-accent/20 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-10 rounded-2xl"></div>
                  <OptimizedImage
                    src="https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif"
                    alt="Coding Animation"
                    className="h-auto w-full transform transition-transform duration-500 group-hover/image:scale-110 rounded-2xl"
                  />
                </motion.div>
                
                <div className="text-center w-full">
                  <motion.div
                    className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/20 border border-primary/40 mb-3 sm:mb-4"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                    viewport={{ once: true }}
                  >
                    <Target className="h-3 w-3 text-primary" />
                    <span className="text-xs font-bold text-primary">Mission & Goals</span>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.6 }}
                    viewport={{ once: true }}
                  >
                    <MissionObjectives />
                  </motion.div>
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
