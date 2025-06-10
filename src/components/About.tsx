
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import OptimizedImage from "@/components/OptimizedImage";

const About = () => {
  return (
    <section
      id="about"
      className="py-20"
    >
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
                <p className="mb-4 text-foreground/80">
                  Fourth-year B.E. in Computer Science at Chitkara University (CGPA: 9.38). I love breaking code, building systems, and crafting clean architectures from MVC → MVVM-C.
                </p>
                <p className="mb-4 text-foreground/80">
                  I'm on a mission to evolve beyond feature racing—towards scalable, maintainable, high-DX iOS platforms. With hands-on experience in full-stack development and a proven track record on coding platforms like LeetCode and GeeksforGeeks, I thrive on collaboration and creative problem-solving.
                </p>
                <p className="text-foreground/80">
                  Outside code? You'll find me gaming, diving into algorithm challenges (LeetCode, GfG), or grabbing pizza while deep-reading the latest in Swift concurrency or Cloud patterns.
                </p>
                
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium">Quick Facts</h3>
                    <ul className="mt-2 space-y-2 text-foreground/80">
                      <li>📱 iOS by day, Swift by night</li>
                      <li>🎮 Gaming breaks between coding sessions</li>
                      <li>🍕 Pizza-powered programmer</li>
                      <li>🏗️ Building scalable architectures</li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-lg font-medium">Education</h3>
                    <ul className="mt-2 space-y-2 text-foreground/80">
                      <li>🎓 B.E. CSE, Chitkara University (2021-2025)</li>
                      <li>🏫 N.C Jindal Public School (2019-2021)</li>
                      <li>🏫 Adarsh Public School (2011-2019)</li>
                    </ul>
                  </div>
                </div>
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
                
                <div className="mt-6 w-full">
                  <h3 className="text-lg font-medium">Current Mission Objectives</h3>
                  <ul className="mt-2 space-y-2 text-foreground/80">
                    <li className="text-green-500">+ Master SwiftUI & Combine</li>
                    <li className="text-green-500">+ Level up MVVM-C architecture</li>
                    <li className="text-green-500">+ Reach 1800 on Codeforces</li>
                    <li className="text-green-500">+ Excel at OLX iOS development</li>
                    <li className="text-red-500">- Sleep schedule (Who needs that anyway?)</li>
                    <li className="text-yellow-500">! Build apps that future me won't hate</li>
                  </ul>
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
