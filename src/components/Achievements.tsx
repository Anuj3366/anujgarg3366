import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";
import { Trophy, Award, Star, FileText } from "lucide-react";
import SectionHeader from "./SectionHeader";

const Achievements = () => {
  const [leetcodeImageLoaded, setLeetcodeImageLoaded] = useState(false);

  // Preload LeetCode image for faster loading
  useEffect(() => {
    const img = new Image();
    img.onload = () => setLeetcodeImageLoaded(true);
    img.src = "https://leetcard.jacoblin.cool/anuj3366?theme=dark&font=ABeeZee";
  }, []);

  return (
    <section id="achievements" className="section-spacing">
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
              <Trophy className="h-3 w-3 sm:h-4 sm:w-4 text-accent" />
              <span className="text-xs sm:text-sm font-bold text-accent">My Achievements</span>
            </div>
          }
          title="Key Achievements"
          description="Showcasing my journey through competitive programming, certifications, and technical milestones"
        />
        
        <Tabs defaultValue="gate" className="mx-auto max-w-6xl">
          <TabsList className="mx-auto mb-8 w-full max-w-2xl justify-center bg-card/50 backdrop-blur-sm border border-border/40 p-1">
            <TabsTrigger 
              value="gate" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 data-[state=active]:text-primary data-[state=active]:bg-primary/10 data-[state=active]:border data-[state=active]:border-primary/20 rounded-md transition-all duration-200"
            >
              <Award className="h-4 w-4" />
              GATE 2025
            </TabsTrigger>
            <TabsTrigger 
              value="gfg" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 data-[state=active]:text-primary data-[state=active]:bg-primary/10 data-[state=active]:border data-[state=active]:border-primary/20 rounded-md transition-all duration-200"
            >
              <Star className="h-4 w-4" />
              GeeksforGeeks
            </TabsTrigger>
            <TabsTrigger 
              value="leetcode" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 data-[state=active]:text-primary data-[state=active]:bg-primary/10 data-[state=active]:border data-[state=active]:border-primary/20 rounded-md transition-all duration-200"
            >
              <Trophy className="h-4 w-4" />
              LeetCode
            </TabsTrigger>
            <TabsTrigger 
              value="certificates" 
              className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-foreground/80 data-[state=active]:text-primary data-[state=active]:bg-primary/10 data-[state=active]:border data-[state=active]:border-primary/20 rounded-md transition-all duration-200"
            >
              <FileText className="h-4 w-4" />
              Certifications
            </TabsTrigger>
          </TabsList>
          
          
          <TabsContent value="gate">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-6"
            >
              <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-2 border-border/60 hover:border-primary/40 transition-all duration-500 hover:shadow-xl">
                <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5 pb-4 border-b border-border/30">
                  <CardTitle className="text-center text-2xl sm:text-3xl text-foreground">
                    GATE 2025 (Computer Science & IT)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mb-6">
                      <h3 className="text-4xl sm:text-5xl font-bold text-primary mb-2">397/1000</h3>
                      <p className="text-lg text-foreground/70">GATE Score 2025</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-700 dark:text-green-300 font-medium">Marks Obtained</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">33.79/100</p>
                      </div>
                      
                      <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-700 dark:text-blue-300 font-medium">All India Rank</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">15,205</p>
                      </div>
                      
                      <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-4 border border-purple-200 dark:border-purple-800">
                        <p className="text-sm text-purple-700 dark:text-purple-300 font-medium">Qualifying Marks</p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">29.2/100</p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-primary/5 border border-primary/20 p-6">
                      <h4 className="text-lg font-semibold mb-3 text-primary flex items-center justify-center gap-2">
                        <Award className="h-5 w-5" />
                        Achievement Highlights
                      </h4>
                      <ul className="text-left text-foreground/80 space-y-2 max-w-2xl mx-auto">
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Successfully qualified GATE 2025 in Computer Science & Information Technology
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Scored above the qualifying cutoff, demonstrating strong CS fundamentals
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Comprehensive knowledge in Data Structures, Algorithms, and System Design
                        </li>
                        <li className="flex items-start gap-2">
                          <span className="text-primary mt-1">•</span>
                          Strong performance in competitive examination with national-level ranking
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="gfg">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-6 lg:grid-cols-3"
            >
              <div className="lg:col-span-1">
                <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-2 border-border/60 hover:border-accent/40 transition-all duration-500 hover:shadow-xl h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-center text-xl text-foreground">
                      GFG Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <img
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20210915115837/gfg3.png"
                      alt="GeeksforGeeks Logo"
                      className="mx-auto mb-4 w-32 h-auto"
                      loading="lazy"
                    />
                    <a
                      href="https://auth.geeksforgeeks.org/user/anujgarg3366"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:text-primary/80 hover:underline font-medium transition-colors duration-200"
                    >
                      @anujgarg3366
                    </a>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card className="h-full bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-2 border-border/60 hover:border-accent/40 transition-all duration-500 hover:shadow-xl">
                  <CardHeader className="pb-4">
                    <CardTitle className="text-xl text-foreground">
                      GFG Achievements
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground/80">Coding Score</span>
                          <span className="text-sm font-bold text-primary">2049</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground/80">Problems Solved</span>
                          <span className="text-sm font-bold text-primary">903</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium text-foreground/80">Contest Rating</span>
                          <span className="text-sm font-bold text-primary">1793</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                          <p className="text-sm text-foreground/70 font-medium">Global Rank</p>
                          <p className="text-2xl font-bold text-primary">2,791</p>
                        </div>
                        
                        <div className="rounded-lg bg-primary/5 border border-primary/20 p-4">
                          <p className="text-sm text-foreground/70 font-medium">Institute Rank</p>
                          <p className="text-2xl font-bold text-primary">33</p>
                        </div>
                        
                        <div className="col-span-2 rounded-lg bg-accent/5 border border-accent/20 p-4">
                          <p className="text-sm text-foreground/70 font-medium">Current Streak</p>
                          <p className="text-2xl font-bold text-accent">219 days</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="leetcode">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-2 border-border/60 hover:border-primary/40 transition-all duration-500 hover:shadow-xl">
                <CardHeader className="pb-4">
                  <CardTitle className="text-center text-xl text-foreground">
                    LeetCode Journey
                  </CardTitle>
                </CardHeader>
                
                <CardContent className="flex flex-col items-center">
                  <img
                    src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
                    alt="LeetCode Logo"
                    className="mb-6 w-40 h-auto"
                    loading="lazy"
                  />
                  
                  <a
                    href="https://leetcode.com/anuj3366/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-6 text-primary hover:text-primary/80 hover:underline font-medium transition-colors duration-200"
                  >
                    @anuj3366
                  </a>
                  
                  <div className="w-full max-w-2xl">
                    {leetcodeImageLoaded ? (
                      <img
                        src="https://leetcard.jacoblin.cool/anuj3366?theme=dark&font=ABeeZee"
                        alt="Anuj Garg LeetCode Statistics showing problem-solving progress and achievements"
                        className="w-full rounded-lg shadow-lg border border-border/40"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-64 bg-primary/5 border border-primary/20 rounded-lg flex items-center justify-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                      </div>
                    )}
                  </div>
                  
                  <p className="mt-6 text-center text-foreground/80 max-w-xl">
                    Consistent problem-solving journey on LeetCode by <strong className="text-primary">Anuj Garg</strong>, focusing on mastering Data Structures & Algorithms
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
          
          <TabsContent value="certificates">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="grid grid-cols-1 gap-6 sm:grid-cols-2"
            >
              <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-2 border-border/60 hover:border-primary/40 transition-all duration-500 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Award className="h-5 w-5 text-primary" />
                    GATE 2025 Qualification
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">Qualified GATE 2025 with a score of 397/1000 in Computer Science & Information Technology, demonstrating strong fundamentals and competitive problem-solving skills.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-2 border-border/60 hover:border-accent/40 transition-all duration-500 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <FileText className="h-5 w-5 text-accent" />
                    AWS Academy Graduate
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">AWS Academy Cloud Foundations certification, covering essential AWS services, cloud computing concepts, and modern cloud architecture patterns.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-2 border-border/60 hover:border-primary/40 transition-all duration-500 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Star className="h-5 w-5 text-primary" />
                    DSA Specialization
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">Comprehensive specialization in Data Structures and Algorithms, covering advanced algorithmic design, complexity analysis, and competitive programming techniques.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-card/90 to-card/60 backdrop-blur-sm border-2 border-border/60 hover:border-accent/40 transition-all duration-500 hover:shadow-xl">
                <CardHeader>
                  <CardTitle className="text-foreground flex items-center gap-2">
                    <Trophy className="h-5 w-5 text-accent" />
                    Software Engineering
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80 leading-relaxed">Software engineering specialization covering modern development practices, testing methodologies, agile project management, and scalable system design.</p>
                </CardContent>
              </Card>
            </motion.div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
};

export default Achievements;
