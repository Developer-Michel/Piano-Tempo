import { useRef, useState } from 'react';
import { useLanguage } from '@/lib/language-context';
import { translations } from '@/lib/translations';
import { motion, useInView } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card } from '@/components/ui/card';
import { MapPin, Phone, Mail, Clock, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';

const contactSchema = z.object({
  name: z.string().min(2, 'Name is required'),
  email: z.string().email('Valid email required'),
  phone: z.string().optional(),
  language: z.string(),
  message: z.string().min(10, 'Message must be at least 10 characters'),
});

type ContactFormData = z.infer<typeof contactSchema>;

export function Contact() {
  const { language } = useLanguage();
  const [isSubmitted, setIsSubmitted] = useState(false);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const { toast } = useToast();

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      name: '',
      email: '',
      phone: '',
      language: language,
      message: '',
    },
  });

  const contactMutation = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest('POST', '/api/contact', data);
    },
    onSuccess: () => {
      setIsSubmitted(true);
      setTimeout(() => {
        setIsSubmitted(false);
        form.reset();
      }, 5000);
    },
    onError: (error: Error) => {
      toast({
        variant: "destructive",
        title: language === 'en' ? 'Error' : 'Erreur',
        description: language === 'en' 
          ? 'There was a problem sending your message. Please try again.' 
          : 'Un problème est survenu lors de l\'envoi de votre message. Veuillez réessayer.',
      });
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    contactMutation.mutate(data);
  };

  const contactInfo = [
    {
      icon: MapPin,
      label: translations.contact.info.address[language],
      value: '123 Music Avenue\nMontreal, QC H2X 1Y6',
    },
    {
      icon: Phone,
      label: translations.contact.info.phone[language],
      value: '(514) 555-0123',
    },
    {
      icon: Mail,
      label: translations.contact.info.email[language],
      value: 'info@pianoatempo.ca',
    },
    {
      icon: Clock,
      label: translations.contact.info.hours[language],
      value: translations.contact.info.hoursDetail[language],
    },
  ];

  return (
    <section id="contact" ref={sectionRef} className="py-24 bg-gray-50" data-testid="section-contact">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="font-display text-4xl md:text-5xl text-black mb-4" data-testid="text-contact-title">
            {translations.contact.title[language]}
          </h2>
          <p className="font-serif text-xl text-gold italic" data-testid="text-contact-subtitle">
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
                  <p className="font-sans text-xl text-gray-800" data-testid="text-form-success">
                    {translations.contact.form.success[language]}
                  </p>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" data-testid="form-contact">
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
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className="border-gray-300 focus:border-gold focus:ring-gold" data-testid="select-language">
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
                      disabled={contactMutation.isPending}
                      data-testid="button-submit-contact"
                    >
                      {contactMutation.isPending ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        translations.contact.form.submit[language]
                      )}
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
                  <h3 className="font-sans font-medium text-black mb-1">{info.label}</h3>
                  <p className="font-sans text-gray-600 whitespace-pre-line">{info.value}</p>
                </div>
              </motion.div>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.9 }}
              className="mt-8"
            >
              <div className="w-full h-64 bg-gray-200 rounded-md flex items-center justify-center" data-testid="map-placeholder">
                <span className="font-sans text-gray-500">Map location</span>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
