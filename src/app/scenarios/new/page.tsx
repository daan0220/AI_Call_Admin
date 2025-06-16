"use client";
import { useState, useRef } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { COLORS } from "@/constants/styles";
import { useRouter } from "next/navigation";
import ReactFlow, { ReactFlowProvider, Background, Controls, MiniMap, ReactFlowInstance, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';

const initialScenario = {
  company: "",
  callerName: "",
  staff: "",
  purpose: "",
  callback: false,
  callbackNumber: "",
  aiNumber: "",
  createdAt: "",
};

const initialNodes = [
  { id: '1', position: { x: 0, y: 100 }, data: { label: '名乗り', text: '' }, type: 'custom' },
  { id: '2', position: { x: 300, y: 100 }, data: { label: '会社名ヒアリング', text: '' }, type: 'custom' },
  { id: '3', position: { x: 600, y: 100 }, data: { label: 'お名前ヒアリング', text: '' }, type: 'custom' },
  { id: '4', position: { x: 900, y: 100 }, data: { label: '担当者ヒアリング', text: '' }, type: 'custom' },
  { id: '5', position: { x: 1200, y: 100 }, data: { label: '要件ヒアリング', text: '' }, type: 'custom' },
  { id: '6', position: { x: 1500, y: 100 }, data: { label: '折り返し希望確認', text: '' }, type: 'custom' },
  { id: '7', position: { x: 1800, y: 50 }, data: { label: '折り返し先番号ヒアリング', text: '' }, type: 'custom' },
  { id: '8', position: { x: 1800, y: 200 }, data: { label: '番号復唱・確認', text: '' }, type: 'custom' },
  { id: '9', position: { x: 2100, y: 100 }, data: { label: '完了・ご案内', text: '' }, type: 'custom' },
  { id: '10', position: { x: 600, y: 300 }, data: { label: '聞き取り不可・背景音大', text: '' }, type: 'custom' },
];
const initialEdges = [
  { id: 'e1-2', source: '1', target: '2', type: 'step' },
  { id: 'e2-3', source: '2', target: '3', type: 'step' },
  { id: 'e3-4', source: '3', target: '4', type: 'step' },
  { id: 'e4-5', source: '4', target: '5', type: 'step' },
  { id: 'e5-6', source: '5', target: '6', type: 'step' },
  { id: 'e6-7', source: '6', target: '7', type: 'step', label: 'はい' },
  { id: 'e6-9', source: '6', target: '9', type: 'step', label: 'いいえ' },
  { id: 'e7-8', source: '7', target: '8', type: 'step' },
  { id: 'e8-9', source: '8', target: '9', type: 'step' },
  { id: 'e2-10', source: '2', target: '10', type: 'step', label: '聞き取れない' },
  { id: 'e3-10', source: '3', target: '10', type: 'step', label: '聞き取れない' },
  { id: 'e4-10', source: '4', target: '10', type: 'step', label: '聞き取れない' },
  { id: 'e5-10', source: '5', target: '10', type: 'step', label: '聞き取れない' },
  { id: 'e7-10', source: '7', target: '10', type: 'step', label: '聞き取れない' },
  { id: 'e8-10', source: '8', target: '10', type: 'step', label: '聞き取れない' },
];

function CustomNode({ data, id }: { data: any; id: string }) {
  return (
    <div className="rounded-xl border-2 border-[#7C6CF6] bg-white shadow p-2 min-w-[220px]">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">🤖</span>
        <span className="font-bold text-[#7C6CF6]">{data.label}</span>
      </div>
      <textarea
        className="w-full text-xs border rounded bg-[#F5F8FF] p-1 mb-1"
        value={data.text}
        onChange={e => data.onChange(id, e.target.value)}
        rows={3}
      />
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
const nodeTypes = { custom: CustomNode };

export default function ScenarioNewPage() {
  const router = useRouter();
  const [scenario, setScenario] = useState(initialScenario);
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);
  const reactFlowInstanceRef = useRef<ReactFlowInstance | null>(null);

  const handleNodeTextChange = (id: string, value: string) => {
    setNodes(nodes => nodes.map(n => n.id === id ? { ...n, data: { ...n.data, text: value, onChange: handleNodeTextChange } } : n));
  };
  const nodesWithOnChange = nodes.map(n => ({ ...n, data: { ...n.data, onChange: handleNodeTextChange } }));

  return (
    <ReactFlowProvider>
      <div className="container mx-auto py-8 px-2 md:px-8">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">←</Button>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>シナリオ新規作成</h1>
        </div>
        <Card className="p-6 md:p-8 mb-8 relative" style={{ borderColor: COLORS.border, background: '#F5F8FF' }}>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold" style={{ color: COLORS.primary }}>基本設定</span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-xl border" style={{ borderColor: COLORS.border }}>
              <tbody>
                <tr><td className="py-2 px-4 w-48 text-gray-600">会社名</td><td className="py-2 px-4"><Input value={scenario.company} onChange={e => setScenario(s => ({ ...s, company: e.target.value }))} /></td></tr>
                <tr><td className="py-2 px-4 text-gray-600">相手の名前</td><td className="py-2 px-4"><Input value={scenario.callerName} onChange={e => setScenario(s => ({ ...s, callerName: e.target.value }))} /></td></tr>
                <tr><td className="py-2 px-4 text-gray-600">担当者</td><td className="py-2 px-4"><Input value={scenario.staff} onChange={e => setScenario(s => ({ ...s, staff: e.target.value }))} /></td></tr>
                <tr><td className="py-2 px-4 text-gray-600">要件</td><td className="py-2 px-4"><Input value={scenario.purpose} onChange={e => setScenario(s => ({ ...s, purpose: e.target.value }))} /></td></tr>
                <tr><td className="py-2 px-4 text-gray-600">折り返し希望</td><td className="py-2 px-4"><Switch checked={scenario.callback} onCheckedChange={v => setScenario(s => ({ ...s, callback: v }))} /></td></tr>
                <tr><td className="py-2 px-4 text-gray-600">折り返し先電話番号</td><td className="py-2 px-4"><Input value={scenario.callbackNumber} onChange={e => setScenario(s => ({ ...s, callbackNumber: e.target.value }))} /></td></tr>
                <tr><td className="py-2 px-4 text-gray-600">AI電話番号</td><td className="py-2 px-4"><Input value={scenario.aiNumber} onChange={e => setScenario(s => ({ ...s, aiNumber: e.target.value }))} /></td></tr>
                <tr><td className="py-2 px-4 text-gray-600">作成日</td><td className="py-2 px-4"><Input value={scenario.createdAt} onChange={e => setScenario(s => ({ ...s, createdAt: e.target.value }))} /></td></tr>
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="p-6 md:p-8 mb-8" style={{ borderColor: COLORS.border, background: '#F5F8FF' }}>
          <div className="flex items-center mb-2">
            <span className="text-lg font-semibold mr-2" style={{ color: COLORS.primary }}>会話詳細フロー</span>
          </div>
          <div className="bg-[#EEF4FF] border rounded-xl h-[400px] w-full overflow-auto" style={{ borderColor: COLORS.border }}>
            <ReactFlow
              nodes={nodesWithOnChange}
              edges={edges}
              nodeTypes={nodeTypes}
              fitView
              zoomOnScroll={false}
              zoomOnPinch={false}
              panOnScroll
              minZoom={0.4}
              maxZoom={2}
              style={{ width: '100%', height: 360, background: '#EEF4FF' }}
              onInit={instance => { reactFlowInstanceRef.current = instance; }}
            >
              <Background gap={24} size={2} color="#C7BFFF" />
              <MiniMap />
              <Controls showInteractive={false} />
            </ReactFlow>
          </div>
        </Card>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => router.back()}>キャンセル</Button>
          <Button style={{ background: COLORS.primary }} onClick={() => router.push(`/scenarios`)}>保存</Button>
        </div>
      </div>
    </ReactFlowProvider>
  );
} 