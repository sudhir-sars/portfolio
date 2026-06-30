import { Landing } from "@/components/landing/Landing";
import { AboutSection } from "@/components/landing/story/sections/AboutSection";
import { ContactSection } from "@/components/landing/story/sections/contact/ContactSection";
import { FeaturedWorkSection } from "@/components/landing/story/sections/featured/FeaturedWorkSection";
import { JourneySection } from "@/components/landing/story/sections/journey/JourneySection";
import { ResumeSection } from "@/components/landing/story/sections/resume/ResumeSection";
import { WritingSection } from "@/components/landing/story/sections/writing/WritingSection";

export default function Home() {
  return (
    <main>
      <Landing />
      <AboutSection />
      <FeaturedWorkSection />
      <JourneySection />
      <WritingSection />
      <ResumeSection />
      <ContactSection />
    </main>
  );
}
