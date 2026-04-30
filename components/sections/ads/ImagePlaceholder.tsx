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
    const iconSize = size === "sm" ? "w-4 h-4" : size === "md" ? "w-6 h-6" : "w-8 h-8";
    const fontSize = size === "sm" ? "text-[8px]" : size === "md" ? "text-[10px]" : "text-xs";
    return (
        <div
            className="absolute inset-0 flex flex-col items-center justify-center gap-1.5 pointer-events-none z-10"
            style={{
                border: `1.5px dashed ${accentColor}`,
                borderRadius: "4px",
                margin: "8px",
            }}
        >
            <Camera className={`${iconSize}`} style={{ color: accentColor, opacity: 0.7 }} />
            <span className={`${fontSize} font-medium tracking-wide`} style={{ color: accentColor, opacity: 0.85 }}>
                {label}
            </span>
        </div>
    );
}
