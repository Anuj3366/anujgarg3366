
import { Card, CardContent } from "@/components/ui/card";
import { Mail, Phone, MapPin } from "lucide-react";

const ContactInfoSection = () => {
  return (
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
                <a
                  href="mailto:anujgarg3366@gmail.com"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
                  anujgarg3366@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-start">
              <Phone className="mr-4 h-5 w-5 text-primary" />
              <div>
                <p className="font-medium">Phone</p>
                <a
                  href="tel:+919899854206"
                  className="text-foreground/80 hover:text-primary transition-colors"
                >
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
  );
};

export default ContactInfoSection;
