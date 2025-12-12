"use client";

import * as React from 'react';
import { motion } from 'motion/react';
import { cn } from '@/lib/utils';

/**
 * Type definition for a single integration item.
 */
export interface Integration {
    name: string;
    description: string;
    iconSrc: string;
}

/**
 * Props for the IntegrationShowcase component.
 */
export interface IntegrationShowcaseProps {
    title: string;
    subtitle: string;
    integrations: Integration[];
    className?: string;
}

// Function to parse the title and wrap the highlighted word
const HighlightedTitle = ({ text }: { text: string }) => {
    const parts = text.split(/~/);
    return (
        <h2 className="text-[26px] sm:text-[30px] lg:text-[38px] font-semibold tracking-[-0.01em] text-white text-center leading-tight">
            {parts.map((part, index) =>
                index === 1 ? (
                    <span key={index} className="text-[#00FF9A]/85 mx-2">
                        {part}
                    </span>
                ) : (
                    part
                ),
            )}
        </h2>
    );
};

export const IntegrationShowcase = React.forwardRef<
    HTMLElement,
    IntegrationShowcaseProps
>(({ title, subtitle, integrations, className }, ref) => {
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.04,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: {
                duration: 0.5,
                ease: [0.22, 1, 0.36, 1] as const,
            },
        },
    };

    return (
        <section ref={ref} className={cn('w-full pt-0 pb-[120px]', className)}>
            <div className="container mx-auto max-w-[1250px] px-6">
                {/* Header Section */}
                <div className="text-center mb-[48px]">
                    <HighlightedTitle text={title} />
                    <p className="mt-[32px] text-[18px] font-normal text-white/55 max-w-[650px] mx-auto leading-[1.6]">
                        {subtitle}
                    </p>
                </div>

                {/* Integrations Grid */}
                <motion.div
                    className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                >
                    {integrations.map((item) => (
                        <motion.div
                            key={item.name}
                            variants={itemVariants}
                            className="group flex items-center gap-6 p-0 px-6 h-[112px] rounded-[20px] bg-white/[0.04] border border-white/[0.07] shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] hover:bg-white/[0.06] transition-all duration-250 ease-out"
                        >
                            {/* Icon Container */}
                            <div className="flex-shrink-0 w-[40px] h-[40px] rounded-[12px] bg-white/[0.04] flex items-center justify-center border border-white/5">
                                {/* eslint-disable-next-line @next/next/no-img-element */}
                                <img
                                    src={item.iconSrc}
                                    alt={`${item.name} logo`}
                                    className="h-[32px] w-[32px] object-contain saturate-[0.9]"
                                />
                            </div>

                            {/* Text Content */}
                            <div className="flex flex-col justify-center">
                                <h3 className="text-[17px] font-medium text-white mb-[2px] leading-tight">{item.name}</h3>
                                <p className="text-[14px] font-normal text-white/45 leading-[1.4] line-clamp-2">{item.description}</p>
                            </div>
                        </motion.div>
                    ))}
                </motion.div>
            </div>
        </section>
    );
});

IntegrationShowcase.displayName = 'IntegrationShowcase';

// Solana ecosystem integrations data
export const solanaIntegrations: Integration[] = [
    {
        name: 'Solana',
        description: 'Native Solana blockchain support.',
        iconSrc: 'https://cryptologos.cc/logos/solana-sol-logo.png',
    },
    {
        name: 'Jupiter',
        description: 'Best price swaps across all DEXs.',
        iconSrc: 'https://cryptologos.cc/logos/jupiter-ag-jup-logo.png',
    },
    {
        name: 'Raydium',
        description: 'AMM and liquidity pools.',
        iconSrc: 'https://cryptologos.cc/logos/raydium-ray-logo.png',
    },
    {
        name: 'Pyth Network',
        description: 'Real-time oracle price feeds.',
        iconSrc: 'https://cryptologos.cc/logos/pyth-network-pyth-logo.png',
    },
    {
        name: 'Wormhole',
        description: 'Cross-chain messaging & bridging.',
        iconSrc: 'https://wormhole.com/logomark-black.png',
    },
    {
        name: 'Telegram',
        description: 'Bot triggers and notifications.',
        iconSrc: 'https://upload.wikimedia.org/wikipedia/commons/8/82/Telegram_logo.svg',
    },
    {
        name: 'Helius',
        description: 'Real-time webhooks and RPC.',
        iconSrc: 'https://avatars.githubusercontent.com/u/107892413?s=280&v=4',
    },
    {
        name: 'Jito',
        description: 'MEV protection and bundles.',
        iconSrc: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTvNYizPs5mVbDmaIhDtLrFXsI-ZcoK3W3b9Q&s',
    },
    {
        name: 'Phantom',
        description: 'Wallet connection support.',
        iconSrc: 'https://avatars.githubusercontent.com/u/78782331',
    },
    {
        name: 'Orca',
        description: 'Concentrated liquidity pools.',
        iconSrc: 'https://cryptologos.cc/logos/orca-orca-logo.png',
    },
    {
        name: 'Birdeye',
        description: 'Token analytics and price feeds.',
        iconSrc: 'https://avatars.githubusercontent.com/u/106565104',
    },
    {
        name: 'And more...',
        description: 'Growing ecosystem of integrations.',
        iconSrc: 'https://img.icons8.com/ios-glyphs/60/ffffff/plus-math.png',
    },
];
