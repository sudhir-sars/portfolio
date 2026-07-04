import { AboutSection } from "@/components/home/AboutSection";
import { ContactSection } from "@/components/home/ContactSection";
import { FeaturedWorkSection } from "@/components/home/FeaturedWorkSection";
import { Landing } from "@/components/home/Landing";
import { ResumeSection } from "@/components/home/ResumeSection";
// import { WritingSection } from "@/components/home/WritingSection";

export default function Home() {
  return (
    <main>
      <Landing />
      <AboutSection />
      <FeaturedWorkSection />
      {/* <WritingSection /> */}
      <ResumeSection />
      <ContactSection />
    </main>
  );
}
