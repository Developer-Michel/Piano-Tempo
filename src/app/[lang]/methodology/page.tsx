import { Header } from "@/components/Header/Header";
import { Footer } from "@/components/Footer";
import {
  Methodology,
  Methodology as MethodologySection,
} from "@/components/Methodology";

export default function MethodologyPage() {
  return (
    <div className="min-h-screen bg-white" data-testid="page-methodology">
      <Header />
      <main className="pt-32 pb-12">
        <Methodology />
      </main>
    </div>
  );
}
