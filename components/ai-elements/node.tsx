import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { Handle, Position } from "@xyflow/react";
import type { ComponentProps } from "react";
import { AnimatedBorder } from "@/components/ui/animated-border";

export type NodeProps = ComponentProps<typeof Card> & {
  handles: {
    target: boolean;
    source: boolean;
  };
  status?: "idle" | "running" | "success" | "error";
};

export const Node = ({ handles, className, status, selected, ...props }: NodeProps & { selected?: boolean }) => (
  <Card
    className={cn(
      "node-container relative size-full h-auto w-sm gap-0 p-0 transition-all duration-150 ease-out",
      // Base Glass Style
      "rounded-[18px] border border-white/10 bg-white/5 backdrop-blur-xl",
      "shadow-[0_0_24px_rgba(0,0,0,0.25),inset_0_0_12px_rgba(255,255,255,0.04)]",
      // Hover State
      "hover:scale-[1.015] hover:shadow-[0_0_30px_rgba(0,255,163,0.15),0_0_18px_rgba(153,69,255,0.12)]",
      // Selected State
      selected && "border-white/10 shadow-[0_0_40px_rgba(0,255,163,0.35),0_0_25px_rgba(153,69,255,0.25)]",
      // Status Styles (override border/shadow if needed, or blend them)
      status === "success" && "border-green-500/50 shadow-[0_0_20px_rgba(34,197,94,0.2)]",
      status === "error" && "border-red-500/50 shadow-[0_0_20px_rgba(239,68,68,0.2)]",
      className
    )}
    {...props}
  >
    {status === "running" && <AnimatedBorder />}
    {handles.target && <Handle position={Position.Left} type="target" className="!bg-white !border-white/20 !w-3 !h-3" />}
    {handles.source && <Handle position={Position.Right} type="source" className="!bg-white !border-white/20 !w-3 !h-3" />}
    {props.children}
  </Card>
);

export type NodeHeaderProps = ComponentProps<typeof CardHeader>;

export const NodeHeader = ({ className, ...props }: NodeHeaderProps) => (
  <CardHeader
    className={cn("gap-0.5 rounded-t-md border-b bg-secondary p-3!", className)}
    {...props}
  />
);

export type NodeTitleProps = ComponentProps<typeof CardTitle>;

export const NodeTitle = ({ className, ...props }: NodeTitleProps) => (
  <CardTitle
    className={cn(
      "text-[16px] font-semibold text-white/90",
      className
    )}
    {...props}
  />
);

export type NodeDescriptionProps = ComponentProps<typeof CardDescription>;

export const NodeDescription = ({ className, ...props }: NodeDescriptionProps) => (
  <CardDescription
    className={cn(
      "text-[13.5px] font-normal leading-[1.4] text-white/65",
      className
    )}
    {...props}
  />
);

export type NodeActionProps = ComponentProps<typeof CardAction>;

export const NodeAction = (props: NodeActionProps) => <CardAction {...props} />;

export type NodeContentProps = ComponentProps<typeof CardContent>;

export const NodeContent = ({ className, ...props }: NodeContentProps) => (
  <CardContent className={cn("rounded-b-md bg-card p-3", className)} {...props} />
);

export type NodeFooterProps = ComponentProps<typeof CardFooter>;

export const NodeFooter = ({ className, ...props }: NodeFooterProps) => (
  <CardFooter
    className={cn("rounded-b-md border-t bg-secondary p-3!", className)}
    {...props}
  />
);
