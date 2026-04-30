import Hero from "@/components/Hero";
import About from "@/components/About";
import SkillsMarquee from "@/components/SkillsMarquee";
import Services from "@/components/Services";
import Experience from "@/components/Experience";
import Projects from "@/components/Projects";
import Interests from "@/components/Interests";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="w-full min-h-screen overflow-x-hidden">
      <Hero />
      <div className="relative">
        <About />
        <Services />
        <SkillsMarquee />
        <Experience />
        <Projects />
        <Interests />
      </div>
      <Footer />
    </main>
  );
}
