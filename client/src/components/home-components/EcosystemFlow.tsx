"use client";

import React, { useMemo, useEffect } from "react";
import {
  ReactFlow,
  Handle,
  Position,
  Node,
  Edge,
  useNodesState,
  useEdgesState,
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

// ─── Icon & color rotation (DB-তে icon/color field নেই, তাই index দিয়ে cycle) ──
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

function CenterNode() {
  return (
    <div className="relative p-5 rounded-2xl bg-slate-950 border-2 border-indigo-500/60 shadow-xl shadow-indigo-500/10 text-center text-white w-60 transition-transform hover:scale-105 duration-300">
      <div className="mx-auto w-11 h-11 rounded-xl bg-gradient-to-tr from-indigo-500 to-indigo-700 text-white flex items-center justify-center mb-2.5 shadow-md">
        <Building2 className="w-5 h-5" />
      </div>
      <div className="font-bold text-sm tracking-wide">PETRONICK HOLDINGS</div>
      <div className="text-[9px] text-indigo-300 font-semibold uppercase tracking-widest mt-0.5">
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

  return (
    <div
      onClick={() => data.onClick(data.id)}
      className={`p-3.5 rounded-xl border cursor-pointer transition-all duration-300 flex items-center gap-3 w-56 bg-slate-900 ${
        isSelected
          ? "border-indigo-400 shadow-lg shadow-indigo-500/10 scale-105"
          : "border-slate-800 hover:border-slate-700 hover:bg-slate-800/80"
      }`}
    >
      <div className={`p-2 rounded-lg bg-gradient-to-tr ${data.color} text-white shrink-0`}>
        <IconComponent className="w-4 h-4" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="font-semibold text-xs text-white truncate">{data.name}</div>
        <div className="text-[9px] text-slate-400 font-medium truncate mt-0.5">
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
  activeNodeId: string | null;
  onSelectNode: (id: string) => void;
}

export default function EcosystemFlow({ companies, activeNodeId, onSelectNode }: EcosystemFlowProps) {
  const initialNodes = useMemo(() => {
    const centerNode: Node = {
      id: "center",
      type: "center",
      position: { x: 260, y: 200 },
      data: {},
      draggable: false,
    };

    const radiusX = 330;
    const radiusY = 200;
    const centerX = 260;
    const centerY = 200;

    const subNodes: Node[] = companies.map((company, index) => {
      const angle = (index * 2 * Math.PI) / companies.length - Math.PI / 2;
      const x = centerX + radiusX * Math.cos(angle) + 20;
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
        },
        draggable: false,
      };
    });

    return [centerNode, ...subNodes];
  }, [companies, activeNodeId, onSelectNode]);

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

  useEffect(() => {
    setNodes(initialNodes);
    setEdges(initialEdges);
  }, [initialNodes, initialEdges, setNodes, setEdges]);

  return (
    <div className="w-full h-[520px] bg-slate-950/80 rounded-2xl border border-slate-800/80 relative overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)] opacity-30" />

   // After
<ReactFlow
  nodes={nodes}
  edges={edges}
  nodeTypes={nodeTypes}
  fitView
  fitViewOptions={{ padding: 0.15 }}
  zoomOnScroll={false}
  zoomOnPinch={false}
  zoomOnDoubleClick={false}
  panOnScroll={false}
  panOnDrag={false}
  preventScrolling={false}
  nodesDraggable={false}
  elementsSelectable={false}
  className="relative z-10"
/>

      <div className="absolute bottom-4 left-4 z-20 bg-slate-900/90 backdrop-blur-md px-3.5 py-2.5 rounded-xl border border-slate-800 text-[10px] space-y-1.5 shadow-lg">
        <div className="font-semibold text-slate-300 uppercase tracking-wider">Ecosystem Diagram</div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-500 animate-pulse" />
          <span>Active Connected Synergy</span>
        </div>
        <div className="flex items-center gap-2 text-slate-400">
          <span className="w-2.5 h-0.5 bg-slate-700" />
          <span>General Corporate Linkage</span>
        </div>
      </div>
    </div>
  );
}