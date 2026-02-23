"use client";

import { useRef, useState, useEffect } from "react";
import { useLocale, useTranslations } from "next-intl";
import { getPublicEnv } from "@/lib/env";
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
import { useFullLocation } from "@/hooks/useFullLocation";
import { MapEmbedOnView } from "./GoogleMap";
import { useParams, useSearchParams } from "next/navigation";

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
  const lang = useLocale();
  const tContact = useTranslations("home.contact");
  const tPrograms = useTranslations("home.programs");
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
      language: lang,
      course: "",
      message: "",
    },
  });
  const location = useFullLocation();
  const searchParams = useSearchParams();
  useEffect(() => {
    console.log("Setting course from URL:", searchParams.get("course"));
    if (searchParams.get("course")) {
      form.setValue("course", searchParams.get("course") || "");
      return;
    }
  }, [searchParams, location]);

  const onSubmit = async (data: ContactFormData) => {
    try {
      const response = await fetch("/api/send-email", {
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
      label: tContact("info.address"),
      value: getPublicEnv("NEXT_PUBLIC_ADDRESS"),
    },
    {
      icon: Mail,
      label: tContact("info.email"),
      value: getPublicEnv("NEXT_PUBLIC_EMAIL"),
    },
    {
      icon: Clock,
      label: tContact("info.hours"),
      value: tContact("info.hoursDetail"),
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
            {tContact("title")}
          </h2>
          <p
            className="font-serif text-xl text-gold "
            data-testid="text-contact-subtitle"
          >
            {tContact("subtitle")}
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
                    {tContact("form.success")}
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
                            {tContact("form.name")}
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
                            {tContact("form.email")}
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
                            {tContact("form.phone")}
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
                            {tContact("form.language")}
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
                              <SelectItem value="en">
                                {tContact("languageOptions.en")}
                              </SelectItem>
                              <SelectItem value="fr">
                                {tContact("languageOptions.fr")}
                              </SelectItem>
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
                            {tContact("form.courseLabel")}
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
                                  placeholder={tContact(
                                    "form.coursePlaceholder",
                                  )}
                                />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem
                                  value={tPrograms("private.title")}
                                  data-testid="option-private"
                                >
                                  {tPrograms("private.title")}
                                </SelectItem>
                                {tPrograms
                                  .raw("groups.items")
                                  .map((item: string, idx: number) => (
                                    <SelectItem
                                      key={idx}
                                      value={item}
                                      data-testid={`option-group-${idx}`}
                                    >
                                      {item}
                                    </SelectItem>
                                  ))}
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
                            {tContact("form.message")}
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
                      {tContact("form.submit")}
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
              <MapEmbedOnView />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
