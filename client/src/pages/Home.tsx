import { Header } from '@/components/Header';
import { Hero } from '@/components/Hero';
import { About } from '@/components/About';
import { Teachers } from '@/components/Teachers';
import { Programs } from '@/components/Programs';
import { Testimonials } from '@/components/Testimonials';
import { Contact } from '@/components/Contact';
import { Footer } from '@/components/Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-white" data-testid="page-home">
      <Header />
      <main>
        <Hero />
        <About />
        <Teachers />
        <Programs />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
