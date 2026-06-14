import Link from "next/link";
import Image from "next/image";

export function Navbar() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-neutral-200">
            <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-center md:justify-start">
                <Link href="/" aria-label="OT MARKETING" className="flex items-center">
                    <Image
                        src="/logo-ot-marketing.png"
                        alt="OT MARKETING"
                        width={160}
                        height={40}
                        priority
                        className="h-10 w-auto"
                    />
                </Link>
            </div>
        </header>
    );
}
