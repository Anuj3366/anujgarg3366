
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

const Achievements = () => {
  const [leetcodeImageLoaded, setLeetcodeImageLoaded] = useState(false);

  // Preload LeetCode image for faster loading
  useEffect(() => {
    const img = new Image();
    img.onload = () => setLeetcodeImageLoaded(true);
    img.src = "https://leetcard.jacoblin.cool/anuj3366?theme=dark&font=ABeeZee";
  }, []);

  return (
    <section
      id="achievements"
      className="py-20"
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <h2 className="mb-6 text-center text-3xl font-bold sm:text-4xl">
          Key Achievements
        </h2>
        
        <Tabs defaultValue="gate" className="mx-auto max-w-4xl">
          <TabsList className="mx-auto mb-8 w-full justify-center">
            <TabsTrigger value="gate">GATE 2025</TabsTrigger>
            <TabsTrigger value="gfg">GeeksforGeeks</TabsTrigger>
            <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
            <TabsTrigger value="certificates">Certifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gate">
            <div className="grid grid-cols-1 gap-6">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="text-center text-2xl">
                    GATE 2025 (Computer Science & IT)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mb-6">
                      <h3 className="text-4xl font-bold text-primary mb-2">397/1000</h3>
                      <p className="text-lg text-foreground/70">GATE Score 2025</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                      <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
                        <p className="text-sm text-green-700 dark:text-green-300">Marks Obtained</p>
                        <p className="text-2xl font-bold text-green-600 dark:text-green-400">33.79/100</p>
                      </div>
                      
                      <div className="rounded-lg bg-blue-50 dark:bg-blue-900/20 p-4 border border-blue-200 dark:border-blue-800">
                        <p className="text-sm text-blue-700 dark:text-blue-300">All India Rank</p>
                        <p className="text-2xl font-bold text-blue-600 dark:text-blue-400">15205</p>
                      </div>
                      
                      <div className="rounded-lg bg-purple-50 dark:bg-purple-900/20 p-4 border border-purple-200 dark:border-purple-800">
                        <p className="text-sm text-purple-700 dark:text-purple-300">Qualifying Marks</p>
                        <p className="text-2xl font-bold text-purple-600 dark:text-purple-400">29.2/100</p>
                      </div>
                    </div>
                    
                    <div className="rounded-lg bg-primary/5 p-6">
                      <h4 className="text-lg font-semibold mb-2 text-primary">Achievement Highlights</h4>
                      <ul className="text-left text-foreground/80 space-y-2">
                        <li>• Successfully qualified GATE 2025 in Computer Science & Information Technology</li>
                        <li>• Scored above the qualifying cutoff, demonstrating strong CS fundamentals</li>
                        <li>• Comprehensive knowledge in Data Structures, Algorithms, and System Design</li>
                        <li>• Strong performance in competitive examination with national-level ranking</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
          
          <TabsContent value="gfg">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
              <div className="lg:col-span-1">
                <Card className="bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-center text-xl">
                      GFG Profile
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="text-center">
                    <img
                      src="https://media.geeksforgeeks.org/wp-content/uploads/20210915115837/gfg3.png"
                      alt="GeeksforGeeks Logo"
                      className="mx-auto mb-4 w-32"
                      loading="lazy"
                    />
                    <a
                      href="https://auth.geeksforgeeks.org/user/anujgarg3366"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-primary hover:underline"
                    >
                      @anujgarg3366
                    </a>
                  </CardContent>
                </Card>
              </div>
              
              <div className="lg:col-span-2">
                <Card className="h-full bg-card/50 backdrop-blur-sm">
                  <CardHeader className="pb-2">
                    <CardTitle className="text-xl">
                      GFG Achievements
                    </CardTitle>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-6">
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">Coding Score</span>
                          <span className="text-sm font-medium text-primary">2049</span>
                        </div>
                        <Progress value={82} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">Problems Solved</span>
                          <span className="text-sm font-medium text-primary">903</span>
                        </div>
                        <Progress value={90} className="h-2" />
                      </div>
                      
                      <div>
                        <div className="mb-2 flex items-center justify-between">
                          <span className="text-sm font-medium">Contest Rating</span>
                          <span className="text-sm font-medium text-primary">1793</span>
                        </div>
                        <Progress value={72} className="h-2" />
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <div className="rounded-lg bg-primary/5 p-4">
                          <p className="text-sm text-foreground/70">Global Rank</p>
                          <p className="text-2xl font-bold text-primary">2791</p>
                        </div>
                        
                        <div className="rounded-lg bg-primary/5 p-4">
                          <p className="text-sm text-foreground/70">Institute Rank</p>
                          <p className="text-2xl font-bold text-primary">33</p>
                        </div>
                        
                        <div className="col-span-2 rounded-lg bg-primary/5 p-4">
                          <p className="text-sm text-foreground/70">Current Streak</p>
                          <p className="text-2xl font-bold text-primary">219 days</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </TabsContent>
          
          <TabsContent value="leetcode">
            <Card className="bg-card/50 backdrop-blur-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-center text-xl">
                  LeetCode Journey
                </CardTitle>
              </CardHeader>
              
              <CardContent className="flex flex-col items-center">
                <img
                  src="https://leetcode.com/static/images/LeetCode_logo_rvs.png"
                  alt="LeetCode Logo"
                  className="mb-6 w-40"
                  loading="lazy"
                />
                
                <a
                  href="https://leetcode.com/anuj3366/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 text-primary hover:underline"
                >
                  @anuj3366
                </a>
                
                <div className="w-full max-w-2xl">
                  {leetcodeImageLoaded ? (
                    <img
                      src="https://leetcard.jacoblin.cool/anuj3366?theme=dark&font=ABeeZee"
                      alt="Anuj Garg LeetCode Statistics showing problem-solving progress and achievements"
                      className="w-full rounded-lg shadow-lg"
                      loading="lazy"
                    />
                  ) : (
                    <div className="w-full h-64 bg-primary/5 rounded-lg flex items-center justify-center">
                      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                    </div>
                  )}
                </div>
                
                <p className="mt-4 text-center text-foreground/80">
                  Consistent problem-solving journey on LeetCode by <strong>Anuj Garg</strong>, focusing on mastering Data Structures & Algorithms
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certificates">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>GATE 2025 Qualification</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">Qualified GATE 2025 with a score of 397/1000 in Computer Science & Information Technology, demonstrating strong fundamentals and competitive problem-solving skills.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>AWS Academy Graduate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">AWS Academy Cloud Foundations certification, covering essential AWS services, cloud computing concepts, and modern cloud architecture patterns.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>DSA Specialization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">Comprehensive specialization in Data Structures and Algorithms, covering advanced algorithmic design, complexity analysis, and competitive programming techniques.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Software Engineering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">Software engineering specialization covering modern development practices, testing methodologies, agile project management, and scalable system design.</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </motion.div>
    </section>
  );
};

export default Achievements;
