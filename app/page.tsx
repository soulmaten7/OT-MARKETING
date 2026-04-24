import { Hero } from "@/components/sections/hero";
import { HowItWorks } from "@/components/sections/how-it-works";
import { Industries } from "@/components/sections/industries";
import { WhatWeBring } from "@/components/sections/what-we-bring";
import { ContactForm } from "@/components/sections/contact-form";

export default function Home() {
  return (
    <div className="flex flex-col gap-0">
      <Hero />
      <WhatWeBring />
      <HowItWorks />
      <Industries />
      <ContactForm />
    </div>
  );
}
