"use client";

import Link from "next/link";
import Image from "next/image";
import {
  WebGLShader,
  ContainerScroll,
  FeaturesSectionWithHoverEffects,
  RadialOrbitalTimeline,
  flowsTimelineData,
  LandingWorkflowDemo,
  IntegrationShowcase,
  solanaIntegrations,
  Footer,
} from "@/components/landing";

export default function LandingPage() {
  return (
    <div className="relative min-h-screen w-full flex flex-col overflow-x-hidden font-[family-name:var(--font-display)]">

      {/* Hero Section with WebGL Background */}
      <div className="relative overflow-hidden min-h-[50rem] md:min-h-[80rem]">
        <WebGLShader />

        {/* Subtle Ambient Gradient */}
        <div className="absolute top-0 right-0 w-[80%] h-[800px] bg-gradient-to-b from-[#9B5CFF]/5 via-[#21D4FD]/5 to-transparent blur-[120px] z-[1] pointer-events-none" />

        {/* Scroll Animation Section */}
        <ContainerScroll
          titleComponent={
            <div className="pt-0 md:pt-10 relative z-10 flex flex-col items-center">
              <p className="text-[20px] md:text-[22px] font-[family-name:var(--font-serif)] italic text-white/65 mb-[16px] tracking-wide font-light">
                Flows by CyreneAI
              </p>
              <h1 className="text-[48px] md:text-[64px] font-bold leading-[1.05] text-white mb-[12px] text-center">
                The automation layer<br className="hidden md:block" /> of Solana
              </h1>
              <p className="text-[18px] md:text-[20px] text-white/70 max-w-[680px] mx-auto leading-[1.4] mb-[32px] text-center">
                Build trading bots, automate LP positions, and deploy agents in minutes.
              </p>

              {/* CTA Buttons - Moved inside Hero */}
              <div className="flex flex-col sm:flex-row items-center gap-4 mb-[20px]">
                <Link
                  href="/workflows/new?template=solana-trader"
                  className="px-8 py-4 text-[16px] font-medium text-white bg-white/10 hover:bg-white/20 backdrop-blur-md border border-white/30 rounded-full transition-all duration-300 hover:scale-105 shadow-lg shadow-black/20"
                >
                  Try Demo
                </Link>
                <a
                  href="https://calendly.com/ashish_netsepio/30min"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-8 py-4 text-[16px] font-medium text-white/90 bg-transparent hover:bg-white/5 border border-white/10 rounded-full transition-all duration-300 hover:scale-105"
                >
                  Schedule Call
                </a>
              </div>
            </div>
          }
        >
          <Image
            src="/hero-image-v2.jpeg"
            alt="Flows by CyreneAI Dashboard"
            height={720}
            width={1400}
            className="mx-auto object-cover h-full w-full object-center rounded-[24px] shadow-[0_0_40px_rgba(0,255,156,0.1)]"
            draggable={false}
            priority
          />
        </ContainerScroll>
      </div>

      {/* Plain background section below hero */}
      <div className="bg-transparent mt-0">
        <section className="px-6 pb-[120px]">
          <FeaturesSectionWithHoverEffects />
        </section>
        <section className="px-6 pb-[120px]">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-[48px]">
              <h2 className="text-[36px] font-bold text-white mb-[32px]">How it works</h2>
              <p className="text-white/80 text-[20px]">Click on the nodes to explore each step</p>
            </div>
            <RadialOrbitalTimeline timelineData={flowsTimelineData} />
          </div>
        </section>
        <section className="px-6 pb-[120px]">
          <div className="max-w-5xl mx-auto">
            <LandingWorkflowDemo />
          </div>
        </section>
        <IntegrationShowcase
          title="Powered by the ~Solana~ ecosystem"
          subtitle="Connect with the best DeFi protocols, wallets, and infrastructure providers."
          integrations={solanaIntegrations}
          className="pb-[120px]"
        />
        <Footer />
      </div>
    </div>
  );
}
