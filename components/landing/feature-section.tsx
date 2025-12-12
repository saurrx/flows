"use client";
import { cn } from "@/lib/utils";
import {
    IconRadar,
    IconPlus,
    IconTrendingUp,
    IconWallet,
    IconRefresh,
} from "@tabler/icons-react";
import Image from "next/image";
import Link from "next/link";

export function FeaturesSectionWithHoverEffects() {
    return (
        <div className="max-w-7xl mx-auto px-6 pt-0 pb-0">
            {/* Section Header */}
            <div className="text-center mb-[48px]">
                <h2 className="text-[36px] font-semibold mb-[32px] text-white tracking-tight">Start with a template</h2>
                <p className="text-white/80 text-[20px] font-medium max-w-2xl mx-auto">Kickstart your automations with ready-made, production-grade Solana flows you can remix in seconds.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                {/* Featured Card - Spans 7 columns on large screens */}
                <div className="lg:col-span-7 flex flex-col bg-white/[0.04] border border-white/[0.07] rounded-[20px] p-8 md:p-10 transition-all duration-300 hover:bg-white/[0.06] group/featured relative overflow-hidden shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]">
                    <div className="flex flex-col h-full relative z-10">
                        <div className="flex justify-between items-start mb-6">
                            <div className="size-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white">
                                <IconTrendingUp className="h-6 w-6" stroke={1.5} />
                            </div>
                            <div className="px-3 py-1 rounded-full bg-white/[0.06] text-white/90 text-[12px] font-semibold uppercase tracking-wider">
                                Popular
                            </div>
                        </div>

                        <h3 className="text-[24px] font-semibold text-white mb-2 tracking-tight">Trading Agent</h3>
                        <p className="text-white/60 text-[16px] font-medium mb-4 uppercase tracking-wide">Where your Telegram feed becomes a trading engine.</p>

                        <p className="text-white/75 text-[16px] leading-relaxed max-w-xl mb-8">
                            Your real-time alpha executor. This agent listens to any Telegram channel, extracts token contract addresses instantly, and executes trades the moment signals appear — fast, accurate, and fully automated.
                        </p>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
                            <div className="space-y-4">
                                <h4 className="text-white/40 text-xs font-bold uppercase tracking-widest">Capabilities</h4>
                                <ul className="space-y-3">
                                    <li className="flex items-center gap-3 text-white/80 text-sm font-medium">
                                        <div className="size-1.5 rounded-full bg-[#14F195]" />
                                        Connect your Telegram bot
                                    </li>
                                    <li className="flex items-center gap-3 text-white/80 text-sm font-medium">
                                        <div className="size-1.5 rounded-full bg-[#14F195]" />
                                        Set custom position sizes
                                    </li>
                                    <li className="flex items-center gap-3 text-white/80 text-sm font-medium">
                                        <div className="size-1.5 rounded-full bg-[#14F195]" />
                                        Auto-validate tokens
                                    </li>
                                    <li className="flex items-center gap-3 text-white/80 text-sm font-medium">
                                        <div className="size-1.5 rounded-full bg-[#14F195]" />
                                        Intelligent slippage control
                                    </li>
                                </ul>
                            </div>
                            <div className="relative h-full min-h-[160px] rounded-xl overflow-hidden border border-white/10 bg-[#080808]">
                                <Image
                                    src="/trading-agent-flow.png"
                                    alt="Trading Agent Flow"
                                    fill
                                    className="object-cover object-center opacity-90 group-hover/featured:scale-105 transition-transform duration-500"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-[#080808] via-transparent to-transparent opacity-60" />
                            </div>
                        </div>

                        <Link 
                            href="/workflows/new?template=solana-trader"
                            className="mt-auto w-full md:w-fit px-8 py-3.5 rounded-xl bg-white text-black font-bold text-sm hover:bg-white/90 transition-colors shadow-lg shadow-white/5 inline-block text-center"
                        >
                            Build This Agent
                        </Link>
                    </div>
                </div>

                {/* Secondary Cards Grid - Spans 5 columns */}
                <div className="lg:col-span-5 grid grid-cols-1 sm:grid-cols-2 gap-6">
                    <SecondaryCard
                        title="Whale Tracker"
                        description="Get notified when specific wallets move funds."
                        icon={<IconRadar className="h-5 w-5" stroke={1.5} />}
                        badge="Coming Soon"
                    />
                    <SecondaryCard
                        title="Auto Rebalancer"
                        description="Maintain portfolio ratios automatically."
                        icon={<IconRefresh className="h-5 w-5" stroke={1.5} />}
                        badge="Coming Soon"
                    />
                    <SecondaryCard
                        title="Wallet Notifier"
                        description="Instant alerts for any wallet activity."
                        icon={<IconWallet className="h-5 w-5" stroke={1.5} />}
                        badge="Coming Soon"
                    />
                    <SecondaryCard
                        title="Build Custom Flow"
                        description="Start from a blank canvas."
                        icon={<IconPlus className="h-5 w-5" stroke={1.5} />}
                        isCustom
                        href="/builder"
                    />
                </div>
            </div>
        </div>
    );
}

const SecondaryCard = ({
    title,
    description,
    icon,
    badge,
    isCustom,
    href,
}: {
    title: string;
    description: string;
    icon: React.ReactNode;
    badge?: string;
    isCustom?: boolean;
    href?: string;
}) => {
    const content = (
        <>
            <div className="flex justify-between items-start mb-5">
                <div className={cn(
                    "size-10 rounded-lg flex items-center justify-center text-white transition-colors bg-white/5",
                    isCustom ? "text-white/80" : "text-white group-hover:text-[#14F195]"
                )}>
                    {icon}
                </div>
                {badge && (
                    <span className="px-2 py-1 rounded-md bg-[#141414] border border-[#262626] text-[#888] text-[10px] font-bold uppercase tracking-wider">
                        {badge}
                    </span>
                )}
            </div>

            <h3 className="text-[20px] font-semibold text-white mb-2 tracking-tight transition-colors">
                {title}
            </h3>
            <p className="text-[16px] text-white/75 leading-relaxed line-clamp-2">
                {description}
            </p>
        </>
    );

    const cardClass = cn(
        "flex flex-col p-6 rounded-[20px] bg-white/[0.04] border border-white/[0.07] transition-all duration-300 group hover:bg-white/[0.06] shadow-[inset_0_0_20px_rgba(0,0,0,0.2)]",
        isCustom && "border-dashed border-white/20 hover:border-white/40"
    );

    if (href) {
        return (
            <Link href={href} className={cardClass}>
                {content}
            </Link>
        );
    }

    return (
        <div className={cardClass}>
            {content}
        </div>
    );
};
