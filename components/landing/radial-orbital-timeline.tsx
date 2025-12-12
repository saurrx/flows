"use client";
import { useState, useEffect, useRef } from "react";
import { Workflow, Activity, GitBranch, Layers, Command } from "lucide-react";
import { cn } from "@/lib/utils";

interface TimelineItem {
    id: number;
    title: string;
    subtitle: string;
    content: string;
    icon: React.ElementType;
    color: string;
}

interface RadialOrbitalTimelineProps {
    timelineData: TimelineItem[];
}

export default function RadialOrbitalTimeline({
    timelineData,
}: RadialOrbitalTimelineProps) {
    const [selectedItem, setSelectedItem] = useState<number>(0);
    const [rotationAngle, setRotationAngle] = useState<number>(0);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        let animationFrame: number;
        let lastTime = performance.now();
        const speed = 0.65;

        const animate = (time: number) => {
            const deltaTime = (time - lastTime) / 1000;
            lastTime = time;

            const direction = Math.sin(time / 14000) > 0 ? 1 : -1;

            setRotationAngle(prev => (prev + speed * deltaTime * direction) % 360);
            animationFrame = requestAnimationFrame(animate);
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left - rect.width / 2) / (rect.width / 2);
        const y = (e.clientY - rect.top - rect.height / 2) / (rect.height / 2);
        setMousePos({ x, y });
    };

    const handleMouseLeave = () => {
        setMousePos({ x: 0, y: 0 });
    };

    const calculateNodePosition = (index: number, total: number) => {
        const angleOffset = 270;
        const angle = ((index / total) * 360 + angleOffset + rotationAngle) % 360;
        const radius = 185;
        const radian = (angle * Math.PI) / 180;

        return {
            x: radius * Math.cos(radian),
            y: radius * Math.sin(radian),
        };
    };

    const selectedData = selectedItem === 0
        ? {
            title: "Your Flow",
            subtitle: "The heart of your automation",
            content: "Combine triggers, logic, and actions with a visual builder designed for traders, creators, and anyone reading Solana alpha.",
            icon: Workflow,
            color: "rgba(255,255,255,0.45)"
        }
        : timelineData.find((item) => item.id === selectedItem);

    return (
        <div
            className="w-full max-w-7xl mx-auto py-0"
            ref={containerRef}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
        >
            <div className="flex flex-col lg:flex-row items-center justify-center gap-20 lg:gap-32">

                {/* Left - Orbital Visualization */}
                <div className="relative flex-shrink-0 w-[500px] h-[500px] flex items-center justify-center">

                    {/* Outer Orbit Ring (500px) */}
                    <div className="absolute inset-0 rounded-full border border-white/[0.08]" />

                    {/* Inner Orbit Ring (370px) */}
                    <div className="absolute w-[370px] h-[370px] rounded-full border border-white/[0.08]" />

                    {/* Center Node - Your Flow */}
                    <div
                        className={cn(
                            "absolute z-30 cursor-pointer group transition-all duration-500",
                            selectedItem === 0 ? "scale-110" : "scale-100 hover:scale-105"
                        )}
                        style={{
                            transform: `translate(${mousePos.x * 5}px, ${mousePos.y * 5}px)`
                        }}
                        onClick={() => setSelectedItem(0)}
                    >
                        {/* Glow */}
                        <div className={cn(
                            "absolute inset-0 -m-4 rounded-full blur-xl transition-all duration-500",
                            selectedItem === 0 ? "bg-white/20 opacity-100" : "bg-white/10 opacity-0 group-hover:opacity-50"
                        )} />

                        {/* Node Body */}
                        <div className="relative w-[64px] h-[64px] rounded-full bg-white/[0.05] backdrop-blur-md border border-white/[0.15] flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:border-white/30">
                            <Workflow className={cn(
                                "w-7 h-7 transition-all duration-300",
                                selectedItem === 0 ? "text-white" : "text-white/70 group-hover:text-white"
                            )} />
                        </div>
                    </div>

                    {/* Orbital Nodes */}
                    {timelineData.map((item, index) => {
                        const position = calculateNodePosition(index, timelineData.length);
                        const isSelected = selectedItem === item.id;
                        const Icon = item.icon;

                        return (
                            <div
                                key={item.id}
                                className="absolute cursor-pointer group"
                                style={{
                                    transform: `translate(${position.x}px, ${position.y}px)`,
                                    zIndex: 20,
                                }}
                                onClick={() => setSelectedItem(item.id)}
                            >
                                {/* Magnetic pull wrapper */}
                                <div
                                    className="relative transition-transform duration-300 ease-out"
                                    style={{
                                        transform: isSelected ? `translate(${mousePos.x * 2}px, ${mousePos.y * 2}px) scale(1.1)` : 'scale(1)'
                                    }}
                                >
                                    {/* Ambient Glow Ring */}
                                    <div
                                        className="absolute inset-0 -m-3 rounded-full blur-xl transition-all duration-500"
                                        style={{
                                            backgroundColor: item.color,
                                            opacity: isSelected ? 0.22 : 0.14
                                        }}
                                    />

                                    {/* Node Body */}
                                    <div className={cn(
                                        "relative w-[48px] h-[48px] rounded-full bg-white/[0.05] backdrop-blur-md border flex items-center justify-center transition-all duration-300",
                                        isSelected ? "border-white/30 bg-white/[0.08]" : "border-white/[0.08] hover:border-white/20"
                                    )}>
                                        <Icon
                                            size={20}
                                            className={cn(
                                                "transition-all duration-300",
                                                isSelected ? "text-white scale-110" : "text-white/70 group-hover:text-white"
                                            )}
                                            style={{
                                                color: isSelected ? item.color : undefined
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {/* Right - Details Card */}
                <div className="flex-1 min-w-0 max-w-[540px]">
                    <div
                        key={selectedItem}
                        className="w-full bg-white/[0.04] backdrop-blur-md border border-white/[0.07] rounded-[20px] p-8 shadow-[inset_0_0_20px_rgba(0,0,0,0.2)] animate-in slide-in-from-bottom-2 fade-in duration-300"
                    >
                        <div className="flex items-start gap-5 mb-6">
                            {selectedData && (
                                <div className="w-12 h-12 rounded-xl bg-white/[0.05] border border-white/[0.1] flex items-center justify-center flex-shrink-0">
                                    <selectedData.icon
                                        className="w-6 h-6"
                                        style={{ color: selectedData.color === "rgba(255,255,255,0.45)" ? "white" : selectedData.color }}
                                    />
                                </div>
                            )}
                            <div>
                                <h3 className="text-[24px] font-semibold text-white mb-1 tracking-tight">
                                    {selectedData?.title}
                                </h3>
                                <p className="text-white/50 text-[16px] font-medium">
                                    {selectedData?.subtitle}
                                </p>
                            </div>
                        </div>

                        <p className="text-white/80 text-[16px] leading-[1.6] font-light">
                            {selectedData?.content}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// Updated Timeline data with new copy and colors
export const flowsTimelineData: TimelineItem[] = [
    {
        id: 1,
        title: "Triggers",
        subtitle: "Events that start your automation",
        content: "Telegram messages, wallet activity, Solana logs, price feeds, or scheduled timers.",
        icon: Activity,
        color: "#00FF9C",
    },
    {
        id: 2,
        title: "Logic",
        subtitle: "Rules that shape your agent's behavior",
        content: "Use natural language or conditional logic to decide how your agent responds.",
        icon: GitBranch,
        color: "#6A4DFF",
    },
    {
        id: 3,
        title: "Actions",
        subtitle: "Everything your agent can do",
        content: "Swap tokens, rebalance LP positions, track wallets, send alerts, execute trades, and more.",
        icon: Layers,
        color: "#00E4FF",
    },
    {
        id: 4,
        title: "Runtime",
        subtitle: "Your automation engine",
        content: "Fast, reliable, always-on execution running directly within your flow.",
        icon: Command,
        color: "rgba(255,255,255,0.45)",
    },
];
