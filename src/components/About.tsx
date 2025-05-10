
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

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
                  I'm a fourth-year Computer Science student at Chitkara University with a 9.38 CGPA, passionate about turning complex challenges into innovative solutions.
                </p>
                <p className="mb-4 text-foreground/80">
                  With hands-on experience in full-stack development and a proven track record on coding platforms like LeetCode and GeeksforGeeks, I thrive on collaboration and creative problem-solving.
                </p>
                <p className="text-foreground/80">
                  As a motivated engineer seeking an entry-level SDE role, I bring strong problem-solving skills and technical expertise in building efficient, high-impact solutions.
                </p>
                
                <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <h3 className="text-lg font-medium">Quick Facts</h3>
                    <ul className="mt-2 space-y-2 text-foreground/80">
                      <li>🧑‍💻 Code by day, Debug by night</li>
                      <li>🎮 Gaming breaks between coding sessions</li>
                      <li>🍕 Pizza-powered programmer</li>
                      <li>🎵 Coding with music = Productivity++</li>
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
                  <img
                    src="https://user-images.githubusercontent.com/74038190/229223263-cf2e4b07-2615-4f87-9c38-e37600f8381a.gif"
                    alt="Coding Animation"
                    className="h-auto w-full"
                  />
                </div>
                
                <div className="mt-6 w-full">
                  <h3 className="text-lg font-medium">Current Mission Objectives</h3>
                  <ul className="mt-2 space-y-2 text-foreground/80">
                    <li className="text-green-500">+ Master System Design</li>
                    <li className="text-green-500">+ Level up Docker skills</li>
                    <li className="text-green-500">+ Reach 1800 on Codeforces</li>
                    <li className="text-green-500">+ Crush the OLX internship</li>
                    <li className="text-red-500">- Sleep schedule (Who needs that anyway?)</li>
                    <li className="text-yellow-500">! Build something that future me won't hate</li>
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
