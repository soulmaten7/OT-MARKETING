import { Hero } from "@/components/sections/hero";
import { WhatWeBring } from "@/components/sections/what-we-bring";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CpaModel } from "@/components/sections/cpa-model";
import { Industries } from "@/components/sections/industries";
import { ContactForm } from "@/components/sections/contact-form";

export default function Home() {
    return (
        <div className="flex flex-col gap-0">
            <Hero />
            <WhatWeBring />
            <HowItWorks />
            <CpaModel />
            <Industries />
            <ContactForm />
        </div>
    );
}
