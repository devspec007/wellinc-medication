import Link from "next/link";

interface LogoProps {
    href?: string;
    className?: string;
}

export default function Logo({ href = "/", className = "" }: LogoProps) {
    return (
        <div className={`xs:flex items-center justify-center w-full px-4 xs:px-6 py-4 lg:py-6 space-x-4 shrink-0 ${className}`}>
            <div className="flex items-center justify-center">
                <span className="inline-flex items-end gap-1">
                    <span className="logo-header">
                        <span className="logo-w">W</span>
                        <span className="logo-ell">ELL</span>
                    </span>
                    <span
                        className="text-sm font-semibold pb-0.5"
                        style={{ color: "var(--color-text)", opacity: 0.7 }}
                    >
                        inc
                    </span>
                </span>
            </div>
        </div>
    );
}

