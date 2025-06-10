import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";

const Achievements = () => {
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
            <TabsTrigger value="gate">GATE Scores</TabsTrigger>
            <TabsTrigger value="gfg">GeeksforGeeks</TabsTrigger>
            <TabsTrigger value="leetcode">LeetCode</TabsTrigger>
            <TabsTrigger value="certificates">Certifications</TabsTrigger>
          </TabsList>
          
          <TabsContent value="gate">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="text-center text-xl">
                    GATE 2025 (CSE & IT)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-primary">397/1000</h3>
                      <p className="text-foreground/70 mt-1">GATE Score</p>
                    </div>
                    
                    <p className="text-foreground/80">
                      Strong performance demonstrating solid understanding of computer science fundamentals and problem-solving capabilities.
                    </p>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader className="bg-primary/5 pb-4">
                  <CardTitle className="text-center text-xl">
                    GATE 2024 (CSE & IT)
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <div className="text-center">
                    <div className="mb-4">
                      <h3 className="text-2xl font-bold text-primary">33.79/100</h3>
                      <p className="text-foreground/70 mt-1">GATE Score</p>
                    </div>
                    
                    <div className="rounded-lg bg-primary/5 p-3 mb-4">
                      <p className="text-sm text-foreground/70">Qualifying Cutoff</p>
                      <p className="text-lg font-bold text-green-500">29.2/100</p>
                    </div>
                    
                    <p className="text-foreground/80">
                      Qualified above the cutoff, showcasing technical competency and analytical skills.
                    </p>
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
                />
                
                <a
                  href="https://leetcode.com/anuj3366/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mb-6 text-primary hover:underline"
                >
                  @anuj3366
                </a>
                
                <img
                  src="https://leetcard.jacoblin.cool/anuj3366?theme=dark&font=ABeeZee"
                  alt="LeetCode Stats"
                  className="w-full max-w-2xl rounded-lg"
                />
                
                <p className="mt-4 text-center text-foreground/80">
                  Consistent problem-solving on LeetCode, focusing on DS & Algorithm mastery
                </p>
              </CardContent>
            </Card>
          </TabsContent>
          
          <TabsContent value="certificates">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>GATE 2025 (CSE & IT)</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">Qualified with a score of 397/1000, demonstrating strong fundamentals in computer science concepts and competitive problem-solving.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>AWS Academy Graduate</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">AWS Academy Cloud Foundations certification, covering essential AWS services and cloud computing concepts.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>DSA Specialization</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">Comprehensive data structures and algorithms specialization covering advanced topics in algorithmic design and analysis.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-card/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Software Engineering</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-foreground/80">Software engineering specialization covering software design principles, testing methodologies, and project management.</p>
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
