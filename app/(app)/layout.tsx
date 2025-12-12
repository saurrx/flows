"use client";

import { ReactFlowProvider } from "@xyflow/react";
import { type ReactNode } from "react";
import { PersistentCanvas } from "@/components/workflow/persistent-canvas";

type AppLayoutProps = {
  children: ReactNode;
};

export default function AppLayout({ children }: AppLayoutProps) {
  return (
    <div className="fixed inset-0 overflow-hidden">
      <ReactFlowProvider>
        <PersistentCanvas />
        <div className="pointer-events-none relative z-10">{children}</div>
      </ReactFlowProvider>
    </div>
  );
}
