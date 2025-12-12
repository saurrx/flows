"use client";

import { useSetAtom } from "jotai";
import { nanoid } from "nanoid";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useCallback, useEffect, useRef } from "react";
import { toast } from "sonner";
import { api } from "@/lib/api-client";
import { authClient, useSession } from "@/lib/auth-client";
import {
    edgesAtom,
    isTransitioningFromHomepageAtom,
    nodesAtom,
} from "@/lib/workflow-store";

function NewWorkflowContent() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const { data: session } = useSession();
    const setNodes = useSetAtom(nodesAtom);
    const setEdges = useSetAtom(edgesAtom);
    const setIsTransitioningFromHomepage = useSetAtom(isTransitioningFromHomepageAtom);
    const hasCreatedRef = useRef(false);

    const ensureSession = useCallback(async () => {
        if (!session) {
            await authClient.signIn.anonymous();
            await new Promise((resolve) => setTimeout(resolve, 100));
        }
    }, [session]);

    useEffect(() => {
        const createFromTemplate = async () => {
            if (hasCreatedRef.current) return;
            hasCreatedRef.current = true;

            const templateName = searchParams.get("template");

            if (!templateName) {
                // No template specified, redirect to homepage
                router.replace("/");
                return;
            }

            try {
                // Fetch the template JSON
                const response = await fetch(`/templates/${templateName}.json`);
                if (!response.ok) {
                    toast.error(`Template "${templateName}" not found`);
                    router.replace("/");
                    return;
                }

                const template = await response.json();

                // Ensure we have a session
                await ensureSession();

                // Generate new IDs for nodes to avoid conflicts
                const idMap = new Map<string, string>();
                const nodes = template.nodes.map((node: { id: string }) => {
                    const newId = nanoid();
                    idMap.set(node.id, newId);
                    return { ...node, id: newId };
                });

                // Update edge references with new IDs
                const edges = template.edges.map((edge: { id: string; source: string; target: string }) => ({
                    ...edge,
                    id: nanoid(),
                    source: idMap.get(edge.source) || edge.source,
                    target: idMap.get(edge.target) || edge.target,
                }));

                // Update the store
                setNodes(nodes);
                setEdges(edges);

                // Create the workflow
                const newWorkflow = await api.workflow.create({
                    name: template.name || "Untitled Workflow",
                    description: template.description || "",
                    nodes,
                    edges,
                });

                // Set transition flag for sidebar animation
                sessionStorage.setItem("animate-sidebar", "true");
                setIsTransitioningFromHomepage(true);

                toast.success(`Created "${template.name}" workflow!`);
                router.replace(`/workflows/${newWorkflow.id}`);
            } catch (error) {
                console.error("Failed to create workflow from template:", error);
                toast.error("Failed to create workflow from template");
                router.replace("/");
            }
        };

        createFromTemplate();
    }, [searchParams, router, ensureSession, setNodes, setEdges, setIsTransitioningFromHomepage]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
            <div className="flex flex-col items-center gap-4">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
                <p className="text-sm text-muted-foreground">Creating workflow...</p>
            </div>
        </div>
    );
}

export default function NewWorkflowPage() {
    return (
        <Suspense fallback={
            <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
            </div>
        }>
            <NewWorkflowContent />
        </Suspense>
    );
}
