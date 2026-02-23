import { Hero } from "@/components/hero/Hero";
import { About } from "@/components/About";

import { Programs } from "@/components/program/Programs";
import { Testimonials } from "@/components/Testimonials";
import { Contact } from "@/components/contact/Contact";
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
      <Hero />

      <div className="belowFold">
        <About />
        <Teachers />
        <Programs />
        <Testimonials />
        <Contact />
      </div>
    </div>
  );
}
