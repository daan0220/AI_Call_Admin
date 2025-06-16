"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/constants/styles";
import { useRouter } from "next/navigation";
import { ChevronLeft, ZoomIn, ZoomOut } from "lucide-react";
import ReactFlow, { Background, Controls, MiniMap, ReactFlowProvider, Handle, Position } from 'reactflow';
import 'reactflow/dist/style.css';
import { useState, useRef } from "react";
import type { ReactFlowInstance } from 'reactflow';
import type { NodeProps } from 'reactflow';

// 仮データ（実際はAPIやpropsで取得）
const scenario = {
  company: "株式会社サンプル",
  callerName: "山田 太郎",
  staff: "佐藤 花子",
  purpose: "契約内容の確認",
  callback: true,
  callbackNumber: "09012345678",
  aiNumber: "05053690814",
  createdAt: "2025-06-15 23:05:00",
};

// カスタムノード
function CustomNode({ data }: NodeProps) {
  return (
    <div className="rounded-xl border-2 border-[#7C6CF6] bg-white shadow p-2 min-w-[220px]">
      <div className="flex items-center gap-2 mb-1">
        <span className="text-2xl">🤖</span>
        <span className="font-bold text-[#7C6CF6]">{data.label}</span>
      </div>
      <div className="w-full text-xs border rounded bg-[#F5F8FF] p-1 mb-1 whitespace-pre-line">{data.text}</div>
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
const nodeTypes = { custom: CustomNode };

// Enginee社の電話番ヒアリング業務フロー
const flowNodes = [
  { id: '1', position: { x: 0, y: 100 }, data: { label: '名乗り', text: '私はEngineeのAI電話番です。要件を伺い、連絡があった旨を取り継がせていただきます' }, type: 'custom' },
  { id: '2', position: { x: 300, y: 100 }, data: { label: '会社名ヒアリング', text: 'お電話ありがとうございます。御社名を教えていただけますか？' }, type: 'custom' },
  { id: '3', position: { x: 600, y: 100 }, data: { label: 'お名前ヒアリング', text: 'お名前を教えていただけますか？' }, type: 'custom' },
  { id: '4', position: { x: 900, y: 100 }, data: { label: '担当者ヒアリング', text: '弊社のどの者宛てでしょうか？担当者名をお伺いします。' }, type: 'custom' },
  { id: '5', position: { x: 1200, y: 100 }, data: { label: '要件ヒアリング', text: 'ご用件をお伺いします。' }, type: 'custom' },
  { id: '6', position: { x: 1500, y: 100 }, data: { label: '折り返し希望確認', text: '折り返しのお電話が必要ですか？' }, type: 'custom' },
  { id: '7', position: { x: 1800, y: 50 }, data: { label: '折り返し先番号ヒアリング', text: '折り返し先のお電話番号を教えてください。' }, type: 'custom' },
  { id: '8', position: { x: 1800, y: 200 }, data: { label: '番号復唱・確認', text: '「○○○-○○○○-○○○○」でお間違いないでしょうか？' }, type: 'custom' },
  { id: '9', position: { x: 2100, y: 100 }, data: { label: '完了・ご案内', text: '担当者よりご連絡させていただきます。' }, type: 'custom' },
  { id: '10', position: { x: 600, y: 300 }, data: { label: '聞き取り不可・背景音大', text: '恐れ入りますが、周囲の音が大きく聞き取れません。もう一度お願いできますか？' }, type: 'custom' },
];

// エッジtypeをすべて'step'で固定
const flowEdges = [
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

export default function ScenarioDetailPage() {
  const router = useRouter();
  const [zoom, setZoom] = useState(1);
  const reactFlowInstanceRef = useRef<ReactFlowInstance | null>(null);

  const handleZoomIn = () => {
    if (reactFlowInstanceRef.current) {
      const newZoom = Math.min(zoom + 0.2, 2);
      (reactFlowInstanceRef.current as ReactFlowInstance).setViewport({ x: 0, y: 0, zoom: newZoom });
      setZoom(newZoom);
    }
  };
  const handleZoomOut = () => {
    if (reactFlowInstanceRef.current) {
      const newZoom = Math.max(zoom - 0.2, 0.4);
      (reactFlowInstanceRef.current as ReactFlowInstance).setViewport({ x: 0, y: 0, zoom: newZoom });
      setZoom(newZoom);
    }
  };

  return (
    <ReactFlowProvider>
      <div className="container mx-auto py-8 px-2 md:px-8">
        <div className="flex items-center mb-4">
          <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
            <ChevronLeft className="w-6 h-6" />
          </Button>
          <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>シナリオ詳細</h1>
        </div>
        <Card className="p-6 md:p-8 mb-8 relative" style={{ borderColor: COLORS.border, background: '#F5F8FF' }}>
          <div className="flex justify-between items-center mb-4">
            <span className="text-lg font-semibold" style={{ color: COLORS.primary }}>基本設定</span>
            <Button style={{ background: COLORS.primary }} className="px-6" onClick={() => router.push(`/scenarios/${1}/edit`)}>編集</Button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm bg-white rounded-xl border" style={{ borderColor: COLORS.border }}>
              <tbody>
                <tr className="border-b"><td className="py-2 px-4 w-48 text-gray-600">会社名</td><td className="py-2 px-4">{scenario.company}</td></tr>
                <tr className="border-b"><td className="py-2 px-4 text-gray-600">相手の名前</td><td className="py-2 px-4">{scenario.callerName}</td></tr>
                <tr className="border-b"><td className="py-2 px-4 text-gray-600">担当者</td><td className="py-2 px-4">{scenario.staff}</td></tr>
                <tr className="border-b"><td className="py-2 px-4 text-gray-600">要件</td><td className="py-2 px-4">{scenario.purpose}</td></tr>
                <tr className="border-b"><td className="py-2 px-4 text-gray-600">折り返し希望</td><td className="py-2 px-4">{scenario.callback ? 'はい' : 'いいえ'}</td></tr>
                <tr className="border-b"><td className="py-2 px-4 text-gray-600">折り返し先電話番号</td><td className="py-2 px-4">{scenario.callback ? scenario.callbackNumber : '-'}</td></tr>
                <tr className="border-b"><td className="py-2 px-4 text-gray-600">AI電話番号</td><td className="py-2 px-4">{scenario.aiNumber}</td></tr>
                <tr><td className="py-2 px-4 text-gray-600">作成日</td><td className="py-2 px-4">{scenario.createdAt}</td></tr>
              </tbody>
            </table>
          </div>
        </Card>
        <Card className="p-6 md:p-8 mb-8" style={{ borderColor: COLORS.border, background: '#F5F8FF' }}>
          <div className="flex items-center mb-2">
            <span className="text-lg font-semibold mr-2" style={{ color: COLORS.primary }}>会話詳細フロー</span>
            <Button variant="outline" size="icon" className="mr-2" onClick={handleZoomIn} style={{ borderColor: COLORS.primary, color: COLORS.primary }}><ZoomIn className="w-5 h-5" /></Button>
            <Button variant="outline" size="icon" onClick={handleZoomOut} style={{ borderColor: COLORS.primary, color: COLORS.primary }}><ZoomOut className="w-5 h-5" /></Button>
          </div>
          <div className="bg-[#EEF4FF] border rounded-xl h-[400px] w-full overflow-auto" style={{ borderColor: COLORS.border }}>
            <ReactFlow
              nodes={flowNodes}
              edges={flowEdges}
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
      </div>
    </ReactFlowProvider>
  );
} 