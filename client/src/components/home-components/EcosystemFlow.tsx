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
const ICON_POOL = [Globe, Gift, ShieldCheck, TrendingUp, Sparkles, Truck, Shirt, Building2];
const COLOR_POOL = [
  "from-blue-500 to-blue-700",
  "from-pink-500 to-pink-700",
  "from-emerald-500 to-emerald-700",
  "from-orange-500 to-orange-700",
  "from-amber-500 to-amber-700",
  "from-teal-500 to-teal-700",
  "from-rose-500 to-rose-700",
  "from-slate-500 to-slate-700",
];

// Per-company name text color (readable on the white node card)
const NAME_COLOR_POOL = [
  "text-blue-700",
  "text-pink-700",
  "text-emerald-700",
  "text-orange-700",
  "text-amber-700",
  "text-teal-700",
  "text-rose-700",
  "text-slate-800",
];

function CenterNode({ data }: any) {
  const compact = !!data?.compact;

  return (
    <div
      className={`relative rounded-2xl bg-slate-950 border-2 border-amber-500/60 shadow-xl shadow-amber-500/10 text-center text-white ${
        compact ? "p-3 w-36" : "p-6 w-56"
      }`}
    >
      <div
        className={`mx-auto rounded-xl bg-gradient-to-tr from-amber-500 to-amber-700 text-white flex items-center justify-center shadow-md ${
          compact ? "w-8 h-8 mb-1.5" : "w-14 h-14 mb-3"
        }`}
      >
        <Building2 className={compact ? "w-4 h-4" : "w-7 h-7"} />
      </div>
      <div
        className={
          compact
            ? "text-sm font-bold tracking-tight leading-tight"
            : "text-xl font-bold tracking-tight leading-snug"
        }
      >
        PETRONICK CORPORATE HOLDINGS
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
  const compact = !!data.compact;

  return (
    <div
      className={`rounded-xl border border-slate-200 bg-white flex items-center shadow-sm ${
        compact ? "p-2.5 gap-2 w-40" : "p-4 gap-3 w-60"
      }`}
    >
      <div
        className={`rounded-full bg-gradient-to-tr ${data.color} text-white shrink-0 flex items-center justify-center ${
          compact ? "w-8 h-8" : "w-11 h-11"
        }`}
      >
        <IconComponent className={compact ? "w-3.5 h-3.5" : "w-5 h-5"} />
      </div>
      <div className="min-w-0 flex-1">
        <div
          className={`font-bold truncate ${data.nameColor || "text-slate-800"} ${
            compact ? "text-xs" : "text-sm"
          }`}
        >
          {data.number}. {data.name}
        </div>
        <div
          className={`mt-0.5 truncate text-slate-400 ${compact ? "text-[10px]" : "text-xs"}`}
        >
          {data.sector}
        </div>
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
}

function EcosystemFlowInner({ companies }: EcosystemFlowProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [containerWidth, setContainerWidth] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth : 700,
  );
  const { fitView } = useReactFlow();

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
        radiusY: 210,
        centerX: containerWidth / 2,
        centerY: 230,
      };
    }
    return { radiusX: 430, radiusY: 280, centerX: 340, centerY: 290 };
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
          number: index + 1,
          name: company.name,
          sector: company.revenueStage || "Business Unit",
          color: COLOR_POOL[index % COLOR_POOL.length],
          nameColor: NAME_COLOR_POOL[index % NAME_COLOR_POOL.length],
          icon: ICON_POOL[index % ICON_POOL.length],
          compact,
        },
        draggable: false,
      };
    });

    return [centerNode, ...subNodes];
  }, [companies, compact, radiusX, radiusY, centerX, centerY]);

  const initialEdges = useMemo(() => {
    return companies.map((company, index) => {
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
        animated: false,
        style: {
          stroke: "#f59e0b",
          strokeWidth: 1.5,
          strokeDasharray: "4 4",
          opacity: 0.6,
        },
      };
      return edge;
    });
  }, [companies]);

  const [nodes, setNodes] = useNodesState(initialNodes);
  const [edges, setEdges] = useEdgesState(initialEdges);

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  useEffect(() => {
    const t = setTimeout(() => {
      fitView({ padding: compact ? 0.3 : 0.12, duration: 200 });
    }, 60);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [compact, companies.length, fitView]);

  return (
    <div
      ref={containerRef}
      className="w-full h-[480px] sm:h-[620px] bg-slate-950/80 rounded-2xl border border-slate-800/80 relative overflow-hidden"
    >
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        fitView
        fitViewOptions={{ padding: compact ? 0.3 : 0.12 }}
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
        proOptions={{ hideAttribution: true }}
        className="relative z-10"
      />

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