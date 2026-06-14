"use client";
import { Camera } from "lucide-react";

interface ImagePlaceholderProps {
    accentColor?: string;
    label?: string;
    size?: "sm" | "md" | "lg";
}

export function ImagePlaceholder({
    accentColor = "rgba(255,255,255,0.5)",
    label = "광고주 브랜드 이미지 영역",
    size = "md",
}: ImagePlaceholderProps) {
    const iconSize = size === "sm" ? "w-5 h-5" : size === "md" ? "w-7 h-7" : "w-9 h-9";
    const fontSize = size === "sm" ? "text-[9px]" : size === "md" ? "text-[11px]" : "text-[13px]";
    return (
        <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-2 pointer-events-none z-10"
            style={{
                border: `2px dashed ${accentColor}`,
                borderRadius: "4px",
                margin: "8px",
            }}
        >
            <Camera className={`${iconSize}`} style={{ color: accentColor, opacity: 0.85 }} />
            <span className={`${fontSize} font-bold tracking-wide`} style={{ color: accentColor, opacity: 0.85 }}>
                {label}
            </span>
        </div>
    );
}
