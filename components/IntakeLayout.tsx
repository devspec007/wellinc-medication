import Logo from "@/components/Logo";
import Stepper, { Step } from "@/components/Stepper";

interface IntakeLayoutProps {
  children: React.ReactNode;
  steps: Step[];
  activeStepIndex: number;
  backHref?: string;
  className?: string;
}

export default function IntakeLayout({
  children,
  steps,
  activeStepIndex,
  backHref,
  className = "",
}: IntakeLayoutProps) {
  return (
    <div className={`min-h-dvh bg-grey-75 font-lora pb-44 ${className}`}>
      <header className="w-full">
        <Logo />
      </header>
      <Stepper steps={steps} activeStepIndex={activeStepIndex} backHref={backHref} />
      <main className="max-w-[700px] mx-auto px-4 md:px-0 mt-2 md:mt-4 lg:mt-6">
        {children}
      </main>
    </div>
  );
}

