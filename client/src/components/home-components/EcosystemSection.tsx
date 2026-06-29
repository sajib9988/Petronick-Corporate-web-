"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ReactFlow, Node, Edge, Background, Controls, MiniMap,
  useNodesState, useEdgesState, addEdge, Connection,
  Handle, Position, NodeProps,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { ExternalLink, X } from "lucide-react";
import Link from "next/link";

// ─── Types ────────────────────────────────────────────────
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

type NodeData = {
  label: string;
  sub?: string;
  color: string;
  company?: Company;
  isCenter?: boolean;
};

// ─── Dynamic Color Palette ────────────────────────────────
const PALETTE = [
  { key: "purple", fill: "#EEEDFE", stroke: "#534AB7", text: "#3C3489" },
  { key: "teal",   fill: "#E1F5EE", stroke: "#0F6E56", text: "#085041" },
  { key: "amber",  fill: "#FAEEDA", stroke: "#854F0B", text: "#633806" },
  { key: "pink",   fill: "#FBEAF0", stroke: "#993556", text: "#72243E" },
  { key: "coral",  fill: "#FAECE7", stroke: "#993C1D", text: "#712B13" },
  { key: "blue",   fill: "#E6F1FB", stroke: "#185FA5", text: "#0C447C" },
];

const CENTER_COLORS = { fill: "#3C3489", stroke: "#534AB7", text: "#fff", subText: "#C8C5F0" };

const STAGE_COLORS: Record<string, string> = {
  Active:         "bg-emerald-50 text-emerald-700 border border-emerald-200",
  Launching:      "bg-blue-50 text-blue-700 border border-blue-200",
  "Pre-launch":   "bg-amber-50 text-amber-700 border border-amber-200",
  "Re-launching": "bg-purple-50 text-purple-700 border border-purple-200",
};

// ─── Custom Node Component ────────────────────────────────
function CompanyNode({ data, selected }: NodeProps) {
  const nodeData = data as unknown as NodeData;
  const isSelected = selected;

  const colors = nodeData.isCenter
    ? CENTER_COLORS
    : (PALETTE.find(p => p.key === nodeData.color) || PALETTE[0]);

  return (
    <div style={{
      background: isSelected && !nodeData.isCenter ? colors.stroke : colors.fill,
      border: `1.5px solid ${colors.stroke}`,
      borderRadius: nodeData.isCenter ? 16 : 12,
      padding: nodeData.isCenter ? "14px 20px" : "10px 14px",
      minWidth: nodeData.isCenter ? 180 : 150,
      textAlign: "center",
      boxShadow: isSelected ? `0 0 0 4px ${colors.stroke}44` : "0 2px 8px rgba(0,0,0,0.08)",
      transition: "all 0.2s cubic-bezier(0.4, 0, 0.2, 1)",
      cursor: "pointer",
      color: isSelected && !nodeData.isCenter ? "#fff" : colors.text,
    }}>
      <Handle type="target" position={Position.Top} style={{ visibility: "hidden" }} />
      <Handle type="source" position={Position.Bottom} style={{ visibility: "hidden" }} />

      <div style={{ fontSize: nodeData.isCenter ? 18 : 13, fontWeight: 700, lineHeight: 1.2 }}>
        {nodeData.label}
      </div>

      {nodeData.sub && (
        <div style={{
          fontSize: 10,
          marginTop: 4,
          opacity: 0.8,
          color: isSelected && !nodeData.isCenter ? "#eee" : "inherit",
        }}>
          {nodeData.sub}
        </div>
      )}
    </div>
  );
}

const nodeTypes = { companyNode: CompanyNode };

// ─── Main Component ───────────────────────────────────────
export default function EcosystemSection({ companies }: { companies: Company[] }) {
  
const [nodes, setNodes, onNodesChange] = useNodesState<Node>([]);
const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);
  const [selected, setSelected] = useState<Company | null>(null);

  useEffect(() => {
    const radius = 280;
    const centerX = 0;
    const centerY = 0;

    const centerNode: Node = {
      id: "center",
      type: "companyNode",
      position: { x: centerX, y: centerY },
      data: { label: "PCH", sub: "Petronick Corporate Holdings", isCenter: true } as NodeData,
      draggable: true,
    };

    const companyNodes: Node[] = companies.map((company, index) => {
      const angle = (index / companies.length) * 2 * Math.PI;
      const x = centerX + radius * Math.cos(angle);
      const y = centerY + radius * Math.sin(angle);
      const colorObj = PALETTE[index % PALETTE.length];

      return {
        id: company.id,
        type: "companyNode",
        position: { x, y },
        data: {
          label: company.name,
          sub: company.revenueStage || "Business Unit",
          color: colorObj.key,
          company: company,
        } as NodeData,
        draggable: true,
      };
    });

    const newEdges: Edge[] = companies.map((company, index) => {
      const colorObj = PALETTE[index % PALETTE.length];
      return {
        id: `edge-${company.id}`,
        source: "center",
        target: company.id,
        type: "smoothstep",
        animated: true,
        style: { stroke: colorObj.stroke, strokeWidth: 2, opacity: 0.4 },
      };
    });

    setNodes([centerNode, ...companyNodes]);
    setEdges(newEdges);
  }, [companies, setNodes, setEdges]);

  const handleNodeClick = (_: any, node: Node) => {
    if (node.id === "center") {
      setSelected(null);
    } else {
      setSelected(node.data.company as Company);
    }
  };

  return (
    <section className="py-16 px-4 max-w-6xl mx-auto">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">Our Ecosystem</h2>
        <p className="text-gray-500 text-sm">
          ডায়নামিকভাবে কানেক্টেড সকল বিজনেস ইউনিট। ড্র্যাগ করে পজিশন পরিবর্তন করা যাবে।
        </p>
      </div>

      <div className="w-full h-[600px] rounded-3xl border border-gray-200 bg-white overflow-hidden shadow-sm mb-10">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onNodeClick={handleNodeClick}
          nodeTypes={nodeTypes}
          fitView
          proOptions={{ hideAttribution: true }}
        >
          <Background color="#f1f5f9" gap={25} />
          <Controls />
          <MiniMap zoomable pannable />
        </ReactFlow>
      </div>

      <div className="space-y-8">
        {selected && (
          <div
            className="max-w-2xl mx-auto p-6 rounded-2xl border-2 bg-white animate-in fade-in zoom-in duration-300"
            style={{
              borderColor:
                PALETTE[companies.findIndex(c => c.id === selected.id) % PALETTE.length]?.stroke,
            }}
          >
            <div className="flex justify-between items-start mb-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-lg bg-gray-900 flex items-center justify-center text-white font-bold">
                  {selected.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-xl font-bold">{selected.name}</h3>
                  <span className="text-xs text-blue-600 font-medium">
                    {selected.revenueStage}
                  </span>
                </div>
              </div>
             <button
  onClick={() => setSelected(null)}
  className="p-1 hover:bg-gray-100 rounded-full"
  aria-label="Close company details"
>
  <X size={20} />
</button>
            </div>
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {selected.description}
            </p>
            {selected.website && (
              <a
                href={selected.website}
                target="_blank"
                className="text-blue-600 text-sm font-semibold inline-flex items-center gap-1"
              >
                Visit Website <ExternalLink size={14} />
              </a>
            )}
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {companies.map((company, index) => (
            <div
              key={company.id}
              onClick={() => setSelected(company)}
              className={`p-4 rounded-xl border transition-all cursor-pointer hover:shadow-md ${
                selected?.id === company.id
                  ? "bg-white ring-2 ring-blue-500"
                  : "bg-white border-gray-100"
              }`}
            >
              <h4 className="font-bold text-sm mb-1">{company.name}</h4>
              <p className="text-xs text-gray-400 line-clamp-1">{company.description}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-12 text-center">
        <Link
          href="/companies"
          className="px-6 py-3 bg-gray-900 text-white rounded-full text-sm font-medium hover:bg-gray-800 transition-all"
        >
          Explore All Units
        </Link>
      </div>
    </section>
  );
}