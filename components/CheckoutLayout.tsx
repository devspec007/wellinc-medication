"use client";
import Logo from "@/components/Logo";
import { useRouter } from "next/navigation";

interface CheckoutLayoutProps {
  children: React.ReactNode;
  className?: string;
  isShowBackButton?: boolean;
}

export default function CheckoutLayout({
  children,
  className = "",
  isShowBackButton = false,
}: CheckoutLayoutProps) {
  const router = useRouter();
  return (
    <div className={`bg-grey-200 pb-22 sm:pb-86 min-h-screen`}>
      <header className={`w-full relative ${className}`}>
        {isShowBackButton && (
          <div
            className=" absolute top-1/2 -translate-y-1/2 z-12 left-[20%]
              rounded-full h-10 w-10 bg-brand-50 flex items-center justify-center
              cursor-pointer hover:bg-brand-75
            "
            onClick={() => router.push("/intake/treatments")}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-brand-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              ></path>
            </svg>
          </div>
        )}
        <Logo />
      </header>
      <main className="mx-auto max-w-3xl">{children}</main>
    </div>
  );
}
