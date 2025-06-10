
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/OptimizedImage";
import AboutContent from "./AboutContent";
import AboutFacts from "./AboutFacts";
import MissionObjectives from "./MissionObjectives";

const About = () => {
  return (
    <section id="about" className="py-20">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-6 text-center text-3xl font-bold sm:text-4xl">
          About Me
        </h2>
        
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm">
              <CardContent className="p-6">
                <AboutContent />
                <AboutFacts />
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-1">
            <Card className="h-full overflow-hidden bg-card/50 backdrop-blur-sm">
              <CardContent className="flex flex-col items-center justify-center p-6">
                <div className="overflow-hidden rounded-lg">
                  <OptimizedImage
                    src="https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif"
                    alt="Coding Animation"
                    className="h-auto w-full"
                    loading="lazy"
                  />
                </div>
                
                <MissionObjectives />
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default About;
