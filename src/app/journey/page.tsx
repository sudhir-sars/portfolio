import type { Metadata } from "next";
import { JourneyTimeline } from "@/components/journey/JourneyTimeline";

export const metadata: Metadata = {
  title: "Journey — README",
  description:
    "Not a resume, a build log. From a school computer I wasn't allowed to touch to the real-time AI systems I ship today.",
};

export default function JourneyPage() {
  return <JourneyTimeline />;
}
