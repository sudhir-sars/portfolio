import type { Metadata } from "next";
import { JourneyExperience } from "@/components/landing/story/sections/journey/JourneyExperience";

export const metadata: Metadata = {
  title: "Journey — README",
  description:
    "Not a résumé, a build log. From a school computer I wasn't allowed to touch to the real-time AI systems I ship today.",
};

export default function JourneyPage() {
  return (
    <main>
      <JourneyExperience />
    </main>
  );
}
