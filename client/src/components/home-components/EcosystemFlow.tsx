"use client";

import React, { useMemo, useEffect, useRef, useState } from "react";
import {
  ReactFlow,
  Handle,
  Position,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
  useReactFlow,
  ReactFlowProvider,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import {
  Building2,
  Globe,
  ShieldCheck,
  Sparkles,
  Truck,
  Shirt,
  Gift,
  TrendingUp,
} from "lucide-react";

type Company = {
  id: string;
  name: string;
  description: string;
  logo: string;
  website: string | null;
  revenueStage: string | null;
  order: number;
  isVisible: boolean;
};

// Icon & color rotation
const ICON_POOL = [Globe, ShieldCheck, Sparkles, Truck, Shirt, Gift, TrendingUp, Building2];
const COLOR_POOL = [
  "from-blue-500 to-blue-700",
  "from-emerald-500 to-emerald-700",
  "from-teal-500 to-teal-700",
  "from-orange-500 to-orange-700",
  "from-pink-500 to-pink-700",
  "from-purple-500 to-purple-700",
  "from-indigo-500 to-indigo-700",
  "from-amber-500 to-amber-700",
];

function CenterNode({ data }: any) {
  const compact = !!data?.compact;

  return (
    <div
      className={`relative rounded-2xl bg-slate-950 border-2 border-indigo-500/60 shadow-xl shadow-indigo-500/10 text-center text-white transition-transform duration-300 hover:scale-[1.03] ${
        compact ? "p-3 w-36" : "p-6 w-64"
      }`}
    >
      <div
        className={`mx-auto rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white flex items-center justify-center shadow-md ${
          compact ? "w-7 h-7 mb-1.5" : "w-11 h-11 mb-3"
        }`}
      >
        <Building2 className={compact ? "w-3.5 h-3.5" : "w-5 h-5"} />
      </div>
      <div
        className={
          compact
            ? "text-xs font-bold tracking-tight leading-tight"
            : "text-2xl font-bold tracking-tight"
        }
      >
        PETRONICK HOLDINGS
      </div>
      <div
        className={`font-semibold uppercase text-indigo-300 ${
          compact ? "mt-0.5 text-[7px] tracking-[0.1em]" : "mt-1 text-sm tracking-[0.2em]"
        }`}
      >
        Parent Core
      </div>

      <Handle type="source" position={Position.Top} className="opacity-0" id="t" />
      <Handle type="source" position={Position.Right} className="opacity-0" id="r" />
      <Handle type="source" position={Position.Bottom} className="opacity-0" id="b" />
      <Handle type="source" position={Position.Left} className="opacity-0" id="l" />
    </div>
  );
}

function SubsidiaryNode({ data }: any) {
  const IconComponent = data.icon;
  const isSelected = data.isActive;
  const compact = !!data.compact;

  return (
    <div
      onClick={() => data.onClick(data.id)}
      className={`rounded-xl border cursor-pointer transition-all duration-300 flex items-center bg-slate-900 ${
        compact ? "p-2.5 gap-2 w-36" : "p-5 gap-3 w-64"
      } ${
        isSelected
          ? "border-indigo-400 ring-2 ring-indigo-500/20 shadow-lg shadow-indigo-500/10 scale-[1.03]"
          : "border-slate-800 hover:border-slate-700 hover:bg-slate-800/80"
      }`}
    >
      <div
        className={`rounded-lg bg-gradient-to-tr ${data.color} text-white shrink-0 flex items-center justify-center ${
          compact ? "p-1.5" : "p-3"
        }`}
      >
        <IconComponent className={compact ? "w-3.5 h-3.5" : "w-5 h-5"} />
      </div>
      <div className="min-w-0 flex-1">
        <div className={`font-semibold text-white truncate ${compact ? "text-[11px]" : "text-sm"}`}>
          {data.name}
        </div>
        {!compact && (
          <div className="mt-1 text-xs text-slate-400 truncate leading-5">
            {data.sector}
          </div>
        )}
      </div>

      <Handle type="target" position={Position.Left} className="opacity-0" id="il" />
      <Handle type="target" position={Position.Right} className="opacity-0" id="ir" />
      <Handle type="target" position={Position.Top} className="opacity-0" id="it" />
      <Handle type="target" position={Position.Bottom} className="opacity-0" id="ib" />
    </div>
  );
}

const nodeTypes = { center: CenterNode, subsidiary: SubsidiaryNode };

interface EcosystemFlowProps {
  companies: Company[];
  activeNodeId: string | null;
  onSelectNode: (id: string) => void;
}

function EcosystemFlowInner({ companies, activeNodeId, onSelectNode }: EcosystemFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 700,
  );
  const { fitView } = useReactFlow();

  // ── Measure container width responsively ──
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const measure = () => setContainerWidth(el.offsetWidth);
    measure();

    const observer = new ResizeObserver(() => measure());
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const compact = containerWidth < 640;

  const { radiusX, radiusY, centerX, centerY } = useMemo(() => {
    if (compact) {
      return {
        radiusX: Math.max(containerWidth * 0.58, 120),
        radiusY: 200,
        centerX: containerWidth / 2,
        centerY: 220,
      };
    }
    return { radiusX: 360, radiusY: 220, centerX: 300, centerY: 220 };
  }, [containerWidth, compact]);

  const initialNodes = useMemo(() => {
    const centerNode: Node = {
      id: "center",
      type: "center",
      position: { x: centerX, y: centerY },
      data: { compact },
      draggable: false,
    };

    const subNodes: Node[] = companies.map((company, index) => {
      const angle = (index * 2 * Math.PI) / companies.length - Math.PI / 2;
      const x = centerX + radiusX * Math.cos(angle) + (compact ? 0 : 20);
      const y = centerY + radiusY * Math.sin(angle);

      return {
        id: company.id,
        type: "subsidiary",
        position: { x, y },
        data: {
          id: company.id,
          name: company.name,
          sector: company.revenueStage || "Business Unit",
          color: COLOR_POOL[index % COLOR_POOL.length],
          icon: ICON_POOL[index % ICON_POOL.length],
          isActive: company.id === activeNodeId,
          onClick: onSelectNode,
          compact,
        },
        draggable: false,
      };
    });

    return [centerNode, ...subNodes];
  }, [companies, activeNodeId, onSelectNode, compact, radiusX, radiusY, centerX, centerY]);

  const initialEdges = useMemo(() => {
    return companies.map((company, index) => {
      const isSelected = company.id === activeNodeId;
      const angle = (index * 2 * Math.PI) / companies.length - Math.PI / 2;

      let sourceHandle = "b";
      if (angle >= -Math.PI / 4 && angle < Math.PI / 4) sourceHandle = "r";
      else if (angle >= Math.PI / 4 && angle < (3 * Math.PI) / 4) sourceHandle = "b";
      else if (angle >= (3 * Math.PI) / 4 || angle < (-3 * Math.PI) / 4) sourceHandle = "l";
      else sourceHandle = "t";

      const targetHandle = Math.cos(angle) > 0 ? "il" : "ir";

      const edge: Edge = {
        id: `edge-${company.id}`,
        source: "center",
        target: company.id,
        sourceHandle,
        targetHandle,
        animated: isSelected,
        style: {
          stroke: isSelected ? "#6366f1" : "#334155",
          strokeWidth: isSelected ? 3 : 1.5,
          opacity: isSelected ? 1 : 0.6,
        },
      };
      return edge;
    });
  }, [companies, activeNodeId]);

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  // Sync nodes/edges on every relevant change (selection, data)
  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  // Re-fit ONLY on layout change (compact toggle / company count) — not on every click
  useEffect(() => {
    const t = setTimeout(() => {
      fitView({ padding: compact ? 0.35 : 0.25, duration: 200 });
    }, 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compact, companies.length, fitView]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[420px] sm:h-[520px] bg-slate-950/80 rounded-2xl border border-slate-800/80 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: compact ? 0.35 : 0.25 }}
        minZoom={0.3}
        maxZoom={1.2}
        zoomOnScroll={false}
        zoomOnPinch={compact}
        zoomOnDoubleClick={false}
        panOnScroll={false}
        panOnDrag={compact}
        preventScrolling={false}
        nodesDraggable={false}
        elementsSelectable={false}
        className="relative z-10"
      />

      {/* Legend */}
      <div className="absolute bottom-3 left-3 sm:bottom-4 sm:left-4 z-20 bg-slate-900/90 backdrop-blur-md px-3 py-2 sm:px-4 sm:py-3 rounded-xl border border-slate-800 text-[10px] sm:text-xs space-y-1.5 sm:space-y-2 shadow-lg max-w-[145px] sm:max-w-none">
        <div className="font-bold uppercase tracking-[0.15em] sm:tracking-[0.2em] text-slate-300">
          Ecosystem Diagram
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-indigo-500 animate-pulse flex-shrink-0" />
          <span>Active Connected Synergy</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2 h-0.5 bg-slate-700 flex-shrink-0" />
          <span>General Corporate Linkage</span>
        </div>
      </div>

      {/* Mobile hint */}
      {compact && (
        <div className="absolute top-3 right-3 z-20 bg-slate-900/90 backdrop-blur-md px-2.5 py-1.5 rounded-lg border border-slate-800 text-[9px] text-slate-400">
          Pinch or drag to explore
        </div>
      )}
    </div>
  );
}

export default function EcosystemFlow(props: EcosystemFlowProps) {
  return (
    <ReactFlowProvider>
      <EcosystemFlowInner {...props} />
    </ReactFlowProvider>
  );
}