"use client";
import { useState, useRef, useCallback } from "react";
import { MessageCircle, Cpu, Rocket, GripVertical, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import Link from "next/link";

interface Node {
    id: string;
    type: string;
    title: string;
    subtitle: string;
    icon: React.ElementType;
    x: number;
    y: number;
    color: string;
}

interface Connection {
    from: string;
    to: string;
}

const initialNodes: Node[] = [
    {
        id: "1",
        type: "trigger",
        title: "New Message",
        subtitle: "Telegram",
        icon: MessageCircle,
        x: 120,
        y: 180,
        color: "#3b82f6",
    },
    {
        id: "2",
        type: "logic",
        title: "Parse Intent",
        subtitle: "AI Logic",
        icon: Cpu,
        x: 380,
        y: 240,
        color: "#46ec13",
    },
    {
        id: "3",
        type: "action",
        title: "Swap SOL",
        subtitle: "Jupiter",
        icon: Rocket,
        x: 640,
        y: 180,
        color: "#f59e0b",
    },
];

const initialConnections: Connection[] = [
    { from: "1", to: "2" },
    { from: "2", to: "3" },
];

export default function LandingWorkflowDemo() {
    const [nodes, setNodes] = useState<Node[]>(initialNodes);
    const [connections, setConnections] = useState<Connection[]>(initialConnections);
    const [draggingNode, setDraggingNode] = useState<string | null>(null);
    const [dragOffset, setDragOffset] = useState({ x: 0, y: 0 });
    const [connecting, setConnecting] = useState<string | null>(null);
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const canvasRef = useRef<HTMLDivElement>(null);

    const handleMouseDown = useCallback((e: React.MouseEvent, nodeId: string) => {
        e.preventDefault();
        const node = nodes.find(n => n.id === nodeId);
        if (!node || !canvasRef.current) return;

        const rect = canvasRef.current.getBoundingClientRect();
        setDragOffset({
            x: e.clientX - rect.left - node.x,
            y: e.clientY - rect.top - node.y,
        });
        setDraggingNode(nodeId);
    }, [nodes]);

    const handleMouseMove = useCallback((e: React.MouseEvent) => {
        if (!canvasRef.current) return;
        const rect = canvasRef.current.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        setMousePos({ x, y });

        if (draggingNode) {
            setNodes(prev => prev.map(node =>
                node.id === draggingNode
                    ? { ...node, x: x - dragOffset.x, y: y - dragOffset.y }
                    : node
            ));
        }
    }, [draggingNode, dragOffset]);

    const handleMouseUp = useCallback(() => {
        setDraggingNode(null);
    }, []);

    const handleConnectorClick = useCallback((nodeId: string, isOutput: boolean) => {
        if (connecting) {
            if (connecting !== nodeId) {
                const exists = connections.some(
                    c => (c.from === connecting && c.to === nodeId) || (c.from === nodeId && c.to === connecting)
                );
                if (!exists) {
                    setConnections(prev => [...prev, { from: connecting, to: nodeId }]);
                }
            }
            setConnecting(null);
        } else if (isOutput) {
            setConnecting(nodeId);
        }
    }, [connecting, connections]);

    const getNodeCenter = (nodeId: string, isOutput: boolean) => {
        const node = nodes.find(n => n.id === nodeId);
        if (!node) return { x: 0, y: 0 };
        return {
            x: node.x + (isOutput ? 160 : 0),
            y: node.y + 30,
        };
    };

    return (
        <div className="w-full max-w-[1300px] mx-auto pt-0 pb-0">
            {/* Section Header */}
            <div className="text-center mb-[48px]">
                <h3 className="text-[14px] font-medium text-[#9CA3AF] tracking-[0.005em] mb-[12px]">
                    Live Workflow Preview
                </h3>
                <p className="text-[16px] font-normal text-[#D1D5DB]/90 max-w-[600px] mx-auto leading-[1.5]">
                    See how agents are built—drag, connect, and execute logic instantly.
                </p>
            </div>

            {/* Canvas Container */}
            <div className="relative w-full max-w-[1100px] mx-auto">
                {/* Neon Reflection */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#46ec13]/5 to-transparent blur-3xl -z-10 transform translate-y-10 scale-95 opacity-40" />

                <div className="relative rounded-[18px] overflow-hidden bg-[#0d0d0d] shadow-[0_20px_60px_rgba(0,0,0,0.6)] border border-white/10 ring-1 ring-white/5">

                    {/* Window Header */}
                    <div className="flex items-center justify-between px-4 py-3 bg-[#1a1a1a] border-b border-white/10">
                        <div className="flex items-center gap-2">
                            <div className="w-3 h-3 rounded-full bg-[#FF5F56]" />
                            <div className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
                            <div className="w-3 h-3 rounded-full bg-[#27C93F]" />
                        </div>
                        <span className="text-xs text-white/30 font-mono">workflow.flow</span>
                        <div className="w-12" />
                    </div>

                    {/* Floating Ghost Button */}
                    <Link 
                        href="/builder"
                        className="absolute top-[60px] right-[20px] z-50 flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/[0.08] bg-black/20 backdrop-blur-sm text-white/80 text-[13px] hover:bg-white/5 transition-colors"
                    >
                        Build This Flow <ArrowRight size={12} />
                    </Link>

                    {/* Canvas */}
                    <div
                        ref={canvasRef}
                        className="relative h-[450px] cursor-crosshair overflow-hidden"
                        style={{
                            background: `
              radial-gradient(circle at center, #1a1a1a 0%, #0d0d0d 100%),
              repeating-linear-gradient(0deg, transparent, transparent 24px, rgba(255,255,255,0.04) 24px, rgba(255,255,255,0.04) 25px),
              repeating-linear-gradient(90deg, transparent, transparent 24px, rgba(255,255,255,0.04) 24px, rgba(255,255,255,0.04) 25px)
            `,
                        }}
                        onMouseMove={handleMouseMove}
                        onMouseUp={handleMouseUp}
                        onMouseLeave={handleMouseUp}
                    >
                        {/* SVG for connections */}
                        <svg className="absolute inset-0 w-full h-full pointer-events-none">
                            <defs>
                                <marker
                                    id="arrowhead"
                                    markerWidth="10"
                                    markerHeight="7"
                                    refX="9"
                                    refY="3.5"
                                    orient="auto"
                                >
                                    <polygon points="0 0, 10 3.5, 0 7" fill="#46ec13" opacity="0.6" />
                                </marker>
                            </defs>

                            {/* Existing connections */}
                            {connections.map((conn, i) => {
                                const from = getNodeCenter(conn.from, true);
                                const to = getNodeCenter(conn.to, false);
                                const midX = (from.x + to.x) / 2;

                                return (
                                    <g key={i}>
                                        <path
                                            d={`M ${from.x} ${from.y} C ${midX} ${from.y}, ${midX} ${to.y}, ${to.x} ${to.y}`}
                                            stroke="#46ec13"
                                            strokeWidth="1.5"
                                            strokeDasharray="6 4"
                                            fill="none"
                                            opacity="0.5"
                                            markerEnd="url(#arrowhead)"
                                        />
                                    </g>
                                );
                            })}

                            {/* Active connection being drawn */}
                            {connecting && (
                                <path
                                    d={`M ${getNodeCenter(connecting, true).x} ${getNodeCenter(connecting, true).y} L ${mousePos.x} ${mousePos.y}`}
                                    stroke="#46ec13"
                                    strokeWidth="1.5"
                                    strokeDasharray="6 4"
                                    fill="none"
                                    opacity="0.8"
                                />
                            )}
                        </svg>

                        {/* Nodes */}
                        {nodes.map((node) => {
                            const Icon = node.icon;
                            const isBeingDragged = draggingNode === node.id;

                            return (
                                <div
                                    key={node.id}
                                    className={cn(
                                        "absolute flex items-center gap-3 bg-[#1e1e1e] border border-white/10 rounded-xl px-3 py-2.5 transition-all duration-200 select-none w-[160px]",
                                        isBeingDragged ? "shadow-xl shadow-black/40 z-50 scale-105 border-white/20" : "hover:border-white/20 hover:shadow-lg"
                                    )}
                                    style={{
                                        left: node.x,
                                        top: node.y,
                                        cursor: isBeingDragged ? 'grabbing' : 'grab',
                                    }}
                                    onMouseDown={(e) => handleMouseDown(e, node.id)}
                                >
                                    {/* Input connector */}
                                    <div
                                        className={cn(
                                            "absolute -left-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 bg-[#1e1e1e] cursor-pointer transition-all duration-200 hover:scale-125",
                                            connecting ? "border-[#46ec13] bg-[#46ec13]/20" : "border-white/20"
                                        )}
                                        onClick={(e) => { e.stopPropagation(); handleConnectorClick(node.id, false); }}
                                    />

                                    {/* Icon */}
                                    <div
                                        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
                                        style={{ backgroundColor: `${node.color}15` }}
                                    >
                                        <Icon size={16} style={{ color: node.color, filter: 'saturate(0.9)' }} />
                                    </div>

                                    {/* Content */}
                                    <div className="min-w-0 flex-1">
                                        <div className="text-[13px] font-medium text-white/90 truncate">{node.title}</div>
                                        <div className="text-[11px] text-white/40 truncate">{node.subtitle}</div>
                                    </div>

                                    {/* Drag handle */}
                                    <GripVertical size={14} className="text-white/10" />

                                    {/* Output connector */}
                                    <div
                                        className={cn(
                                            "absolute -right-1.5 top-1/2 -translate-y-1/2 w-3 h-3 rounded-full border-2 cursor-pointer transition-all duration-200 hover:scale-125",
                                            connecting === node.id
                                                ? "border-[#46ec13] bg-[#46ec13] scale-125"
                                                : "border-[#46ec13]/60 bg-[#46ec13]/20 hover:bg-[#46ec13]/40"
                                        )}
                                        onClick={(e) => { e.stopPropagation(); handleConnectorClick(node.id, true); }}
                                    />
                                </div>
                            );
                        })}

                        {/* Hint text */}
                        {!draggingNode && !connecting && (
                            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-[12px] text-white/20 flex items-center gap-2 select-none pointer-events-none">
                                <span>Drag nodes to move</span>
                                <span className="w-0.5 h-0.5 rounded-full bg-white/20" />
                                <span>Click connectors to link</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Footer Microcopy */}
            <p className="text-center text-[#6B7280] mt-[32px] text-[14px] font-normal tracking-[0.25px]">
                Everything you see here is real — this is how your flow works.
            </p>
        </div>
    );
}
