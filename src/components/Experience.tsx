
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Briefcase, GraduationCap } from "lucide-react";
import SectionHeader from "./SectionHeader";

const Experience = () => {
  return (
    <section
      id="experience"
      className="section-spacing bg-background/95 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="container mx-auto container-spacing"
      >
        <SectionHeader
          badge={
            <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full bg-primary/20 border border-primary/40 mb-4 sm:mb-6">
              <Briefcase className="h-3 w-3 sm:h-4 sm:w-4 text-primary" />
              <span className="text-xs sm:text-sm font-bold text-primary">Professional Journey</span>
            </div>
          }
          title="Experience"
          description="My professional journey and educational background in computer science and software development"
        />
        
        <Tabs defaultValue="professional" className="mx-auto max-w-4xl">
          <TabsList className="mx-auto mb-8 w-full justify-center bg-card/80 backdrop-blur-sm border border-border/40">
            <TabsTrigger 
              value="professional"
              className="flex items-center gap-2 text-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/10"
            >
              <Briefcase className="h-4 w-4" />
              Work Experience
            </TabsTrigger>
            <TabsTrigger 
              value="education"
              className="flex items-center gap-2 text-foreground data-[state=active]:text-primary data-[state=active]:bg-primary/10"
            >
              <GraduationCap className="h-4 w-4" />
              Education
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="professional">
            <div className="grid gap-6">
              <Card className="overflow-hidden bg-card/90 backdrop-blur-sm border border-border/60">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="flex flex-col items-start justify-between sm:flex-row sm:items-center text-foreground">
                    <span>OLX India</span>
                    <span className="mt-2 text-sm font-normal text-foreground/70 sm:mt-0">April 2025 - Present</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="font-medium text-foreground">iOS Developer Intern</h3>
                    <p className="text-sm text-foreground/70">Gurugram, Haryana, India</p>
                  </div>
                  <ul className="ml-4 list-disc space-y-2 text-foreground/80">
                    <li>Developed and maintained iOS application features using Swift and Xcode, collaborating with product and design teams to enhance user experience.</li>
                    <li>Integrated RESTful API endpoints to streamline data exchange and improve app performance and responsiveness.</li>
                    <li>Debugged and resolved critical issues to enhance application stability and efficiency, while following Agile and version-control (Git) workflows.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <Card className="overflow-hidden bg-card/90 backdrop-blur-sm border border-border/60">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="flex flex-col items-start justify-between sm:flex-row sm:items-center text-foreground">
                    <span>iNeuBytes</span>
                    <span className="mt-2 text-sm font-normal text-foreground/70 sm:mt-0">August 2023 - September 2023</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="font-medium text-foreground">Web Developer Intern</h3>
                  </div>
                  <ul className="ml-4 list-disc space-y-2 text-foreground/80">
                    <li>Developed backend services and RESTful APIs for a scalable web application, focusing on efficient database management and real-time processing.</li>
                    <li>Collaborated with product and design teams to integrate user feedback, delivering iterative enhancements to the user experience.</li>
                    <li>Awarded Best Intern for delivering high-impact solutions and improving workflow efficiency.</li>
                  </ul>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="education">
            <div className="grid gap-6">
              <Card className="overflow-hidden bg-card/90 backdrop-blur-sm border border-border/60">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="flex flex-col items-start justify-between sm:flex-row sm:items-center text-foreground">
                    <span>Chitkara University</span>
                    <span className="mt-2 text-sm font-normal text-foreground/70 sm:mt-0">July 2021 - July 2025</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="mb-4">
                    <h3 className="font-medium text-foreground">Bachelor of Engineering - BE, Computer Science</h3>
                    <p className="text-sm font-medium text-primary">CGPA: 9.38</p>
                  </div>
                  <ul className="ml-4 list-disc space-y-2 text-foreground/80">
                    <li>Computer Science curriculum focused on algorithms, data structures, and software engineering.</li>
                    <li>Participated in weekly coding competitions, refining algorithmic thinking and competitive programming skills.</li>
                    <li>Completed courses in cloud computing, software engineering, and artificial intelligence.</li>
                  </ul>
                </CardContent>
              </Card>
              
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <Card className="overflow-hidden bg-card/90 backdrop-blur-sm border border-border/60">
                  <CardHeader className="bg-primary/5 pb-4">
                    <CardTitle className="text-base text-foreground">N.C jindal public school</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm text-foreground/70">April 2019 - April 2021</p>
                  </CardContent>
                </Card>
                
                <Card className="overflow-hidden bg-card/90 backdrop-blur-sm border border-border/60">
                  <CardHeader className="bg-primary/5 pb-4">
                    <CardTitle className="text-base text-foreground">Adarsh Public School</CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <p className="text-sm text-foreground/70">April 2011 - April 2019</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
};

export default Experience;
