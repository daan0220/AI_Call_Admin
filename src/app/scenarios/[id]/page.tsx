"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { COLORS } from "@/constants/styles";
import { useRouter } from "next/navigation";
import { ChevronLeft, ZoomIn, ZoomOut, Shuffle } from "lucide-react";

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

export default function ScenarioDetailPage() {
  const router = useRouter();
  return (
    <div className="container mx-auto py-8 px-2 md:px-8">
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className="text-2xl font-bold" style={{ color: COLORS.primary }}>シナリオ詳細</h1>
      </div>
      <Card className="p-6 md:p-8 mb-8 relative" style={{ borderColor: COLORS.border }}>
        <div className="flex justify-between items-center mb-4">
          <span className="text-lg font-semibold text-[#7C6CF6]">基本設定</span>
          <Button style={{ background: COLORS.primary }} className="px-6">編集</Button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm bg-white rounded-xl">
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
      <Card className="p-6 md:p-8 mb-8">
        <div className="flex items-center mb-2">
          <span className="text-lg font-semibold text-[#7C6CF6] mr-2">会話詳細フロー</span>
          <Button variant="outline" size="icon" className="mr-2"><Shuffle className="w-5 h-5" /></Button>
          <Button variant="outline" size="icon" className="mr-2"><ZoomIn className="w-5 h-5" /></Button>
          <Button variant="outline" size="icon"><ZoomOut className="w-5 h-5" /></Button>
        </div>
        <div className="bg-gray-50 border border-dashed border-gray-200 rounded-xl h-48 flex items-center justify-center text-gray-400">
          （ここに会話フロー図や詳細が入ります）
        </div>
      </Card>
    </div>
  );
} 