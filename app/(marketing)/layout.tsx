import type { ReactNode } from "react";

type MarketingLayoutProps = {
  children: ReactNode;
};

export default function MarketingLayout({ children }: MarketingLayoutProps) {
  return (
    <div 
      className="min-h-screen overflow-x-hidden overflow-y-auto"
      style={{ background: "linear-gradient(to bottom, #000000, #050505)" }}
    >
      {children}
    </div>
  );
}
