import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Mail, Phone, MapPin, Send } from "lucide-react";
import { toast } from "sonner";
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const {
      name,
      value
    } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    setTimeout(() => {
      toast.success("Message sent successfully! I'll get back to you soon.");
      setFormData({
        name: "",
        email: "",
        message: ""
      });
      setIsSubmitting(false);
    }, 1500);
  };
  return <section id="contact" className="">
      {/* Layer for background gradient for optimal visibility */}
      <div className="absolute inset-0 pointer-events-none select-none bg-gradient-to-br from-white/90 via-background/70 to-card/70 blur-none z-0" aria-hidden="true"></div>
      <motion.div initial={{
      opacity: 0,
      y: 20
    }} whileInView={{
      opacity: 1,
      y: 0
    }} transition={{
      duration: 0.5
    }} viewport={{
      once: true
    }} className="relative z-10">
        <h2 style={{
        letterSpacing: "0.02em"
      }} className="text-center text-2xl sm:text-3xl font-extrabold\\\\nmb-8 sm:mb-10\\\\ntext-foreground\\\\n mx-0 my-[20px] md:text-4xl">
          Get In Touch
        </h2>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Card className="h-full bg-card/90 border border-border/50 shadow-md">
              <CardContent className="flex h-full flex-col justify-between p-6">
                <div>
                  <h3 className="mb-6 text-lg sm:text-xl font-semibold text-foreground/90">
                    Contact Information
                  </h3>

                  <div className="space-y-6">
                    <div className="flex items-start">
                      <Mail className="mr-4 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Email</p>
                        <a href="mailto:anujgarg3366@gmail.com" className="text-foreground/80 hover:text-primary">
                          anujgarg3366@gmail.com
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <Phone className="mr-4 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Phone</p>
                        <a href="tel:+919899854206" className="text-foreground/80 hover:text-primary">
                          +91 9899854206
                        </a>
                      </div>
                    </div>

                    <div className="flex items-start">
                      <MapPin className="mr-4 h-5 w-5 text-primary" />
                      <div>
                        <p className="font-medium">Location</p>
                        <p className="text-foreground/80">Delhi, India</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-10">
                  <p className="text-foreground/80">
                    Looking forward to hearing from you! Feel free to reach out for collaborations, opportunities, or just to say hello.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-3">
            <Card className="bg-white/95 dark:bg-card/90 border border-border/50 shadow-lg">
              <CardContent className="p-6">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="mb-2 block text-sm font-medium text-foreground">
                      Name
                    </label>
                    <Input id="name" name="name" value={formData.name} onChange={handleChange} placeholder="Your Name" required />
                  </div>

                  <div>
                    <label htmlFor="email" className="mb-2 block text-sm font-medium text-foreground">
                      Email
                    </label>
                    <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} placeholder="your.email@example.com" required />
                  </div>

                  <div>
                    <label htmlFor="message" className="mb-2 block text-sm font-medium text-foreground">
                      Message
                    </label>
                    <Textarea id="message" name="message" value={formData.message} onChange={handleChange} placeholder="Your message here..." rows={6} required />
                  </div>

                  <Button type="submit" className="w-full text-base font-medium" disabled={isSubmitting}>
                    {isSubmitting ? <span className="flex items-center">
                        <svg className="mr-2 h-4 w-4 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        Sending...
                      </span> : <span className="flex items-center">
                        Send Message
                        <Send className="ml-2 h-4 w-4" />
                      </span>}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </motion.div>
    </section>;
};
export default Contact;