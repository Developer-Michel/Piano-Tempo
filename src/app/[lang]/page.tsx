import { Hero } from "@/components/Hero";
import { About } from "@/components/About";

import { Programs } from "@/components/program/Programs";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/contact/Contact";
import { Footer } from "@/components/Footer";
import { Teachers } from "@/components/Teachers/Teachers";

export type HomeSection =
  | "hero"
  | "about"
  | "teachers"
  | "programs"
  | "testimonials"
  | "contact";

export default function Home() {
  return (
    <div className="min-h-screen bg-white" data-testid="page-home">
      <main>
        <Hero />
        <About />
        <Teachers />
        <Programs />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
