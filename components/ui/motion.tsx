"use client";

import { motion, useInView, type Variants } from "framer-motion";
import { useRef, type ReactNode } from "react";
import CountUp from "react-countup";

/**
 * OT MARKETING — Framer Motion 재사용 헬퍼
 * (viewport 진입 once 트리거, prefers-reduced-motion 자동 대응)
 */

const easeOut: [number, number, number, number] = [0.25, 0.1, 0.25, 1];

interface FadeInUpProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    y?: number;
    once?: boolean;
    className?: string;
}

export function FadeInUp({
    children,
    delay = 0,
    duration = 0.6,
    y = 24,
    once = true,
    className,
}: FadeInUpProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once, margin: "-100px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration, delay, ease: easeOut }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface FadeInProps {
    children: ReactNode;
    delay?: number;
    duration?: number;
    once?: boolean;
    className?: string;
}

export function FadeIn({
    children,
    delay = 0,
    duration = 0.6,
    once = true,
    className,
}: FadeInProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once, margin: "-100px" });
    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration, delay, ease: easeOut }}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerContainerProps {
    children: ReactNode;
    stagger?: number;
    delayChildren?: number;
    once?: boolean;
    className?: string;
}

export function StaggerContainer({
    children,
    stagger = 0.1,
    delayChildren = 0,
    once = true,
    className,
}: StaggerContainerProps) {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once, margin: "-50px" });
    const variants: Variants = {
        hidden: {},
        show: {
            transition: { staggerChildren: stagger, delayChildren },
        },
    };
    return (
        <motion.div
            ref={ref}
            variants={variants}
            initial="hidden"
            animate={inView ? "show" : "hidden"}
            className={className}
        >
            {children}
        </motion.div>
    );
}

interface StaggerItemProps {
    children: ReactNode;
    y?: number;
    className?: string;
}

export function StaggerItem({ children, y = 16, className }: StaggerItemProps) {
    const variants: Variants = {
        hidden: { opacity: 0, y },
        show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeOut } },
    };
    return (
        <motion.div variants={variants} className={className}>
            {children}
        </motion.div>
    );
}

interface CountUpInViewProps {
    end: number;
    duration?: number;
    suffix?: string;
    prefix?: string;
    decimals?: number;
    separator?: string;
    className?: string;
}

export function CountUpInView({
    end,
    duration = 1.8,
    suffix = "",
    prefix = "",
    decimals = 0,
    separator = ",",
    className,
}: CountUpInViewProps) {
    const ref = useRef<HTMLSpanElement>(null);
    const inView = useInView(ref, { once: true });
    return (
        <span ref={ref} className={className}>
            {inView ? (
                <CountUp
                    end={end}
                    duration={duration}
                    suffix={suffix}
                    prefix={prefix}
                    decimals={decimals}
                    separator={separator}
                />
            ) : (
                `${prefix}0${suffix}`
            )}
        </span>
    );
}

/**
 * 단어 단위 stagger fade-in-up (Hero 헤드라인용)
 */
interface WordStaggerProps {
    text: string;
    className?: string;
    wordClassName?: string;
    delay?: number;
    stagger?: number;
}

export function WordStagger({
    text,
    className,
    wordClassName,
    delay = 0,
    stagger = 0.06,
}: WordStaggerProps) {
    const words = text.split(" ");
    return (
        <span className={className}>
            {words.map((word, i) => (
                <motion.span
                    key={i}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                        duration: 0.5,
                        delay: delay + i * stagger,
                        ease: easeOut,
                    }}
                    className={`inline-block ${wordClassName ?? ""}`}
                    style={{ marginRight: i < words.length - 1 ? "0.25em" : 0 }}
                >
                    {word}
                </motion.span>
            ))}
        </span>
    );
}
