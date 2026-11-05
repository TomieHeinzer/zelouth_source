import type { Metadata } from "next";
import { CareersSection } from "@/components/careers-section";

export const metadata: Metadata = {
  title: "Careers",
  description: "Blockchain seats on the protocol and the bazaar. AI seats on the models and the agent runtime. All remote.",
};

export default function CareersPage() {
  return (
    <main className="bg-sand pt-24">
      <CareersSection heading="h1" />
    </main>
  );
}
