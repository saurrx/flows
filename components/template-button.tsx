"use client";

import { Rocket } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";

export function TemplateButton() {
    const pathname = usePathname();

    // Only show on homepage
    if (pathname !== "/") {
        return null;
    }

    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50">
            <Link href="/workflows/new?template=solana-trader">
                <Button
                    size="lg"
                    className="gap-2 shadow-lg bg-gradient-to-r from-purple-600 to-green-500 hover:from-purple-700 hover:to-green-600 text-white font-medium px-6"
                >
                    <Rocket className="h-5 w-5" />
                    Try Solana Trading Agent
                </Button>
            </Link>
        </div>
    );
}
