import { useRef, useState, useEffect } from "react";
import { useLanguage } from "@/lib/language-context";
import { translations } from "@/lib/translations";
import { motion, useInView } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  CheckCircle,
  Loader2,
  AlertCircle,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useLocation } from "wouter";
import { useFullLocation } from "@/hooks/useFullLocation";

const contactSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  phone: z.string().optional(),
  language: z.string(),
  course: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const { language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { toast } = useToast();
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      language: language,
      course: "",
      message: "",
    },
  });

  const fullLocation = useFullLocation();

  useEffect(() => {
    try {
      const url = new URL(fullLocation, window.location.origin);

      // 1) if there is a hash like #contact?course=...
      let raw = url.hash || "";

      // 2) if no hash, fallback to normal ?course=...
      if (!raw && url.search) {
        const courseFromSearch = url.searchParams.get("course");
        if (courseFromSearch) {
          form.setValue("course", courseFromSearch);
          const el = document.getElementById("contact");
          if (el) el.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      if (!raw) return;

      const parts = raw.replace(/^#/, "").split("?");
      if (parts.length < 2) return;

      const params = new URLSearchParams(parts[1]);
      const course = params.get("course");

      if (course) {
        form.setValue("course", course);
        const el = document.getElementById("contact");
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }
    } catch {
      // ignore parsing errors
    }
  }, [fullLocation, form]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/.netlify/functions/send-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (response.ok) {
        setIsSubmitted(true);
        toast({
          title: "Success",
          description:
            "Your message has been sent. We will get back to you shortly.",
        });
        form.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      toast({
        title: "Error",
        description:
          "There was an error sending your message. Please try again later.",
        variant: "destructive",
      });
    }
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: translations.contact.info.address[language],
      value: import.meta.env.VITE_ADDRESS,
    },
    {
      icon: Mail,
      label: translations.contact.info.email[language],
      value: import.meta.env.VITE_EMAIL,
    },
    {
      icon: Clock,
      label: translations.contact.info.hours[language],
      value: translations.contact.info.hoursDetail[language],
    },
  ];

  return (
    <section
      id="contact"
      ref={sectionRef}
      className="py-24 bg-gray-50"
      data-testid="section-contact"
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2
            className="font-serif text-4xl md:text-5xl text-black mb-4"
            data-testid="text-contact-title"
          >
            {translations.contact.title[language]}
          </h2>
          <p
            className="font-serif text-xl text-gold "
            data-testid="text-contact-subtitle"
          >
            {translations.contact.subtitle[language]}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Card className="p-8 bg-white">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <CheckCircle className="w-16 h-16 text-green-500 mb-4" />
                  <p
                    className="font-sans text-xl text-gray-800"
                    data-testid="text-form-success"
                  >
                    {translations.contact.form.success[language]}
                  </p>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6"
                    data-testid="form-contact"
                  >
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-gray-700">
                            {translations.contact.form.name[language]}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              className="border-gray-300 focus:border-gold focus:ring-gold"
                              data-testid="input-name"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-gray-700">
                            {translations.contact.form.email[language]}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="email"
                              className="border-gray-300 focus:border-gold focus:ring-gold"
                              data-testid="input-email"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="phone"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-gray-700">
                            {translations.contact.form.phone[language]}
                          </FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              type="tel"
                              className="border-gray-300 focus:border-gold focus:ring-gold"
                              data-testid="input-phone"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="language"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-gray-700">
                            {translations.contact.form.language[language]}
                          </FormLabel>
                          <Select
                            onValueChange={field.onChange}
                            value={field.value}
                          >
                            <FormControl>
                              <SelectTrigger
                                className="border-gray-300 focus:border-gold focus:ring-gold"
                                data-testid="select-language"
                              >
                                <SelectValue />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="en">English</SelectItem>
                              <SelectItem value="fr">Français</SelectItem>
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="course"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-gray-700">
                            {language === "en"
                              ? "Which course are you interested in?"
                              : "Quel cours vous intéresse ?"}
                          </FormLabel>
                          <FormControl>
                            <Select
                              onValueChange={field.onChange}
                              value={field.value}
                            >
                              <SelectTrigger
                                className="border-gray-300 focus:border-gold focus:ring-gold"
                                data-testid="select-course"
                              >
                                <SelectValue
                                  placeholder={
                                    language === "en"
                                      ? "Select a course"
                                      : "Sélectionner un cours"
                                  }
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  value={
                                    translations.programs.private.title[
                                      language
                                    ]
                                  }
                                  data-testid="option-private"
                                >
                                  {
                                    translations.programs.private.title[
                                      language
                                    ]
                                  }
                                </SelectItem>
                                {translations.programs.groups.items.map(
                                  (it, idx) => (
                                    <SelectItem
                                      key={idx}
                                      value={it[language]}
                                      data-testid={`option-group-${idx}`}
                                    >
                                      {it[language]}
                                    </SelectItem>
                                  ),
                                )}
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="font-sans text-gray-700">
                            {translations.contact.form.message[language]}
                          </FormLabel>
                          <FormControl>
                            <Textarea
                              {...field}
                              rows={4}
                              className="border-gray-300 focus:border-gold focus:ring-gold resize-none"
                              data-testid="input-message"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <Button
                      type="submit"
                      className="w-full bg-gold hover:bg-gold-dark text-white font-sans py-6 transition-all duration-300 hover:shadow-lg"
                      // disabled={contactMutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      {/* {contactMutation.isPending ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : ( */}
                      {translations.contact.form.submit[language]}
                      {/* )} */}
                    </Button>
                  </form>
                </Form>
              )}
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="space-y-8"
          >
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.5 + index * 0.1 }}
                className="flex items-start gap-4"
                data-testid={`contact-info-${index}`}
              >
                <div className="w-12 h-12 flex items-center justify-center bg-gold/10 rounded-md shrink-0">
                  <info.icon className="w-6 h-6 text-gold" />
                </div>
                <div>
                  <h3 className="font-sans font-medium text-black mb-1">
                    {info.label}
                  </h3>
                  <p className="font-sans text-gray-600 whitespace-pre-line">
                    {info.value}
                  </p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8"
            >
              <div className="w-full h-64 rounded-md overflow-hidden border">
                {/* Map embed: prefer lat/lng if provided, otherwise use address search */}
                {import.meta.env.VITE_MAP_LAT &&
                import.meta.env.VITE_MAP_LNG ? (
                  <iframe
                    title="Studio location"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      `${import.meta.env.VITE_MAP_LAT},${
                        import.meta.env.VITE_MAP_LNG
                      }`,
                    )}&z=15&output=embed`}
                    className="w-full h-full"
                    loading="lazy"
                  />
                ) : import.meta.env.VITE_ADDRESS ? (
                  <iframe
                    title="Studio location"
                    src={`https://maps.google.com/maps?q=${encodeURIComponent(
                      import.meta.env.VITE_ADDRESS,
                    )}&z=15&output=embed`}
                    className="w-full h-full"
                    loading="lazy"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                    <span className="font-sans text-gray-500">
                      Map location
                    </span>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
