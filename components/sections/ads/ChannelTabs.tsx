"use client";

interface Channel {
    id: string;
    name: string;
    color?: string;
}

interface ChannelTabsProps {
    channels: Channel[];
    active: string;
    onChange: (id: string) => void;
}

export function ChannelTabs({ channels, active, onChange }: ChannelTabsProps) {
    return (
        <div className="relative">
            <div className="flex gap-2 overflow-x-auto scrollbar-hide pb-2 md:justify-center md:pb-0 md:flex-wrap">
                {channels.map((c) => (
                    <button
                        key={c.id}
                        onClick={() => onChange(c.id)}
                        className={`relative px-4 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-colors flex-shrink-0 ${
                            active === c.id
                                ? "bg-[var(--coral-500)] text-white"
                                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                        }`}
                    >
                        {c.name}
                    </button>
                ))}
            </div>
        </div>
    );
}
