
import { motion } from "framer-motion";
import ContactFormSection from "./hero/ContactFormSection";
import ContactInfoSection from "./hero/ContactInfoSection";

const Contact = () => {
  return (
    <section id="contact" className="relative">
      <div className="absolute inset-0 pointer-events-none select-none bg-gradient-to-br from-white/90 via-background/70 to-card/70 blur-none z-0" aria-hidden="true"></div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
        className="relative z-10"
      >
        <h2
          style={{ letterSpacing: "0.02em" }}
          className="text-center text-2xl sm:text-3xl font-extrabold mb-8 sm:mb-10 text-foreground mx-0 my-[20px] md:text-4xl"
        >
          Get In Touch
        </h2>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 sm:gap-10 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <ContactInfoSection />
          </div>
          <div className="lg:col-span-3">
            <ContactFormSection />
          </div>
        </div>
      </motion.div>
    </section>
  );
};

export default Contact;
