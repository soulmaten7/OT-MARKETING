import { Hero } from "@/components/sections/hero";
import { Stats } from "@/components/sections/stats";
import { WhatWeBring } from "@/components/sections/what-we-bring";
import { Industries } from "@/components/sections/industries";
import { HowItWorks } from "@/components/sections/how-it-works";
import { CpaModel } from "@/components/sections/cpa-model";
import { Guardrail } from "@/components/sections/guardrail";
import { ContactForm } from "@/components/sections/contact-form";

export default function Home() {
    return (
        <div className="flex flex-col gap-0">
            <Hero />
            <Stats />
            <WhatWeBring />
            <Industries />
            <HowItWorks />
            <CpaModel />
            <Guardrail />
            <ContactForm />
        </div>
    );
}
