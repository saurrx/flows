"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Twitter, Send, FileText, ArrowUpRight } from "lucide-react";

export function Footer() {
    return (
        <footer className="w-full bg-gradient-to-b from-[#020314] to-[#040617] py-[72px] px-6 md:px-12">
            <div className="mx-auto max-w-[1400px]">
                {/* Footer Panel */}
                <div className="relative overflow-hidden rounded-[20px] border border-white/[0.04] bg-[#12121a]/88 shadow-[0_18px_40px_rgba(0,0,0,0.55)] backdrop-blur-sm">
                    {/* Glass Gradient Overlay */}
                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-white/[0.02] to-transparent" />

                    {/* Noise Texture */}
                    <div className="absolute inset-0 pointer-events-none opacity-[0.02] bg-repeat mix-blend-overlay" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noiseFilter)\'/%3E%3C/svg%3E")' }} />

                    <div className="relative z-10 px-5 py-8 md:px-12 md:py-16">

                        {/* Top Area */}
                        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[380px_1fr_320px] lg:gap-8">

                            {/* Column A: Brand */}
                            <div className="flex flex-col items-start">
                                <div className="flex items-center gap-4 mb-4">
                                    <div className="relative h-16 w-16 flex-shrink-0">
                                        <Image
                                            src="/cyrene-logo.png"
                                            alt="Cyrene AI Logo"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="text-[16px] font-normal text-white/75 tracking-tight">
                                        Cyrene AI
                                    </span>
                                </div>

                                <p className="text-[14px] leading-[1.45] text-white/[0.36] max-w-[420px] mb-6">
                                    AI-powered infrastructure for tokenized markets on Solana.
                                </p>

                                <div className="flex items-center gap-3">
                                    <SocialLink href="https://x.com/CyreneAI" label="X (Twitter)" icon={Twitter} />
                                    <SocialLink href="https://t.me/CyreneAI" label="Telegram" icon={Send} />
                                    <SocialLink href="https://docs.netsepio.com/latest/cyreneai/using-cyreneai/api-integration" label="Docs" icon={FileText} />
                                </div>
                            </div>

                            {/* Column B: Quick Links */}
                            <div className="flex flex-col md:pl-8">
                                <h4 className="text-[14px] font-semibold text-white/[0.48] mb-6">Quick Links</h4>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-2 lg:grid-cols-2">
                                    <FooterLink href="https://docs.netsepio.com/latest/cyreneai/using-cyreneai/api-integration">Docs</FooterLink>
                                    <FooterLink href="#">Templates</FooterLink>
                                    <FooterLink href="#">Blog</FooterLink>
                                    <FooterLink href="#">Pricing</FooterLink>
                                    <div className="flex items-center gap-2">
                                        <FooterLink href="#">API</FooterLink>
                                        <span className="inline-flex items-center justify-center rounded-full border border-[#6A4DFF]/12 bg-[#6A4DFF]/12 px-2 py-0.5 text-[10px] font-medium text-[#6A4DFF]">
                                            Beta
                                        </span>
                                    </div>
                                    <FooterLink href="#">Project Support</FooterLink>
                                </div>
                            </div>

                            {/* Column C: Contact */}
                            <div className="flex flex-col">
                                <h4 className="text-[14px] font-semibold text-white/[0.48] mb-6">Contact</h4>
                                <div className="flex flex-col gap-1 text-[14px] text-white/[0.48]">
                                    <p>CyreneAI LLC</p>
                                    <a
                                        href="mailto:support@cyreneai.com"
                                        className="mt-2 font-semibold text-white/90 hover:text-[#00FF9C] hover:underline transition-colors w-fit"
                                    >
                                        support@cyreneai.com
                                    </a>
                                    <a
                                        href="mailto:partners@cyreneai.com"
                                        className="mt-4 flex items-center gap-1.5 text-[13px] text-white/[0.36] hover:text-white transition-colors w-fit group"
                                    >
                                        Partner with us <ArrowUpRight size={12} className="opacity-50 group-hover:opacity-100" />
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Divider */}
                        <div className="my-[32px] h-px w-full bg-white/[0.03]" />

                        {/* Bottom Area */}
                        <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">

                            {/* Copyright */}
                            <div className="text-[14px] text-white/[0.55] text-center md:text-left">
                                © 2025 CyreneAI. All rights reserved.
                            </div>

                            {/* Sponsor */}
                            <div className="flex items-center justify-center gap-2 text-[13px] text-white/[0.36]">
                                <span>Powered by</span>
                                <a
                                    href="https://netsepio.com"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-1.5 font-medium text-white/50 hover:text-white transition-colors"
                                >
                                    <div className="flex h-5 w-5 items-center justify-center rounded bg-white/10">
                                        <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3 text-white" xmlns="http://www.w3.org/2000/svg">
                                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                                        </svg>
                                    </div>
                                    NetSepio
                                </a>
                            </div>

                            {/* Legal Links */}
                            <div className="flex items-center justify-center gap-6 text-[13px] text-white/[0.36]">
                                <Link href="#" className="hover:text-white transition-colors">Privacy Policy</Link>
                                <Link href="#" className="hover:text-white transition-colors">Terms of Service</Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}

function SocialLink({ href, label, icon: Icon }: { href: string; label: string; icon: any }) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-white/[0.03] text-white/70 transition-all hover:bg-white/[0.06] hover:text-white hover:scale-105"
        >
            <Icon size={16} />
        </a>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            className="flex items-center gap-3 text-[14px] text-white/[0.36] transition-colors hover:text-[#00FF9C]"
        >
            <span className="h-1.5 w-1.5 rounded-full bg-white/10" />
            {children}
        </Link>
    );
}
