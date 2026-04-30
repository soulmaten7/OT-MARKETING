"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";

interface PhoneFrameProps {
    children: ReactNode;
    label?: string;
    accentColor?: string;
}

export function PhoneFrame({ children, label, accentColor = "var(--coral-400)" }: PhoneFrameProps) {
    return (
        <motion.div
            whileHover={{ scale: 1.02, y: -4 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
            className="relative group"
        >
            {label && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-[var(--navy)] text-white text-xs font-bold px-3 py-1 rounded-full whitespace-nowrap">
                    {label}
                </div>
            )}
            <div
                className="relative w-[280px] md:w-[320px] aspect-[9/19.5] bg-gray-900 rounded-[2.5rem] p-2 shadow-xl group-hover:shadow-2xl transition-shadow"
                style={{ boxShadow: `0 20px 40px -10px ${accentColor}33` }}
            >
                <div className="absolute top-2 left-1/2 -translate-x-1/2 w-24 h-6 bg-black rounded-full z-10" />
                <div className="w-full h-full bg-white rounded-[2rem] overflow-hidden relative">
                    {children}
                </div>
            </div>
        </motion.div>
    );
}
