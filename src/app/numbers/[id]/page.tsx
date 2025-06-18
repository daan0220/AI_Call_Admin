"use client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useMemo } from "react";
import { LAYOUT_STYLES, COLORS } from "@/constants/styles";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { useState } from "react";
import { EntityDetailActions } from '@/components/common/EntityDetailActions';
import { DeleteEntityDialog } from '@/components/common/DeleteEntityDialog';
import { NUMBER_DETAIL_TEXTS } from '@/constants/texts';
// 仮データ（実際はAPIやpropsで取得）
const demoDetail = {
  id: "187",
  status: "デモ利用中",
  number: "05053690814",
  fee: "30日間無料デモ環境無料利用中。無料電話回線のご利用は残り：<span style='color:#E94B4B'>28日間</span>",
  applicant: "安藤太紀",
  appliedAt: "2025-06-15 23:05:00",
  contractStart: "2025-06-15 23:05:00",
  workMode: "稼働時間設定",
  workPeriod: "2025-06-15 ～ 2100-12-31",
  workDays: "月 火 水 木 金",
  workTime: "08:00～19:00",
  inAction: "代表電話取次ぎ（営業電話抑止）",
  outAction: "折り返し専用(担当者、用件確認)",
  logs: [
    { date: "2025-06-15 23:06:52", action: "シナリオ設定", scenario: "代表電話取次ぎ（営業電話抑止）", updater: "安藤太紀" },
    { date: "2025-06-15 23:06:52", action: "シナリオ設定", scenario: "折り返し専用(担当者、用件確認)", updater: "安藤太紀" },
    { date: "2025-06-15 23:05:00", action: "無料デモ開始", scenario: "折り返し専用(担当者、用件確認)", updater: "安藤太紀" },
  ]
};

function PhoneNumberDetailTable({ phone }: { phone: typeof demoDetail }) {
  return (
    <Table className="text-base bg-white rounded-xl border mb-8" style={{ borderColor: '#E0E0F0' }}>
      <TableBody>
        <TableRow><TableCell className="py-2 px-4 w-48 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.id}</TableCell><TableCell className="py-2 px-4">{phone.id}</TableCell></TableRow>
        <TableRow><TableCell className="py-2 px-4 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.status}</TableCell><TableCell className="py-2 px-4">{phone.status}</TableCell></TableRow>
        <TableRow><TableCell className="py-2 px-4 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.number}</TableCell><TableCell className="py-2 px-4">{phone.number}</TableCell></TableRow>
        <TableRow><TableCell className="py-2 px-4 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.fee}</TableCell><TableCell className="py-2 px-4"><span dangerouslySetInnerHTML={{__html: phone.fee}} /></TableCell></TableRow>
        <TableRow><TableCell className="py-2 px-4 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.applicant}</TableCell><TableCell className="py-2 px-4">{phone.applicant}</TableCell></TableRow>
        <TableRow><TableCell className="py-2 px-4 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.appliedAt}</TableCell><TableCell className="py-2 px-4">{phone.appliedAt}</TableCell></TableRow>
        <TableRow><TableCell className="py-2 px-4 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.contractStart}</TableCell><TableCell className="py-2 px-4">{phone.contractStart}</TableCell></TableRow>
      </TableBody>
    </Table>
  );
}

export default function NumberDetailPage() {
  const router = useRouter();
  const detail = useMemo(() => demoDetail, []);
  const [editMode, setEditMode] = useState(false);
  const [editDetail, setEditDetail] = useState({
    workMode: detail.workMode,
    workPeriod: detail.workPeriod,
    workDays: detail.workDays,
    workTime: detail.workTime,
    inAction: detail.inAction,
    outAction: detail.outAction,
  });
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const handleEdit = () => {/* 編集ページ遷移 */};
  const handleDelete = () => setDeleteDialogOpen(true);
  const handleDeleteConfirm = () => { setDeleteDialogOpen(false); router.back(); };

  return (
    <div className={LAYOUT_STYLES.container}>
      <div className="flex items-center mb-4">
        <Button variant="ghost" size="icon" onClick={() => router.back()} className="mr-2">
          <ChevronLeft className="w-6 h-6" />
        </Button>
        <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary, marginBottom: 12 }}>
          {NUMBER_DETAIL_TEXTS.pageTitle(detail.number)}
        </h1>
      </div>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: '#3B3172' }}>{NUMBER_DETAIL_TEXTS.info.basic}</h2>
          <EntityDetailActions onEdit={handleEdit} onDelete={handleDelete} />
        </div>
        <PhoneNumberDetailTable phone={detail} />
        <DeleteEntityDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen} entityName={detail.number} onDelete={handleDeleteConfirm} onCancel={() => setDeleteDialogOpen(false)} />
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold" style={{ color: '#3B3172' }}>{NUMBER_DETAIL_TEXTS.info.scenario}</h2>
          {editMode ? (
            <div>
              <Button variant="outline" className="mr-2" onClick={() => setEditMode(false)}>{NUMBER_DETAIL_TEXTS.cancel}</Button>
              <Button style={{ background: COLORS.primary, color: '#fff' }} onClick={() => { setEditMode(false); /* 保存処理 */ }}>{NUMBER_DETAIL_TEXTS.save}</Button>
            </div>
          ) : (
            <Button style={{ background: '#00CFFF', color: '#fff', fontWeight: 600 }} onClick={() => setEditMode(true)}>{NUMBER_DETAIL_TEXTS.edit}</Button>
          )}
        </div>
        <div className="mb-4 p-3 rounded bg-orange-50 text-orange-600 text-sm flex items-center gap-2">
          <span className="text-xl">⚠️</span>
          {NUMBER_DETAIL_TEXTS.alert}
        </div>
        <Table className="text-base bg-white rounded-xl border mb-8" style={{ borderColor: '#E0E0F0' }}>
          <TableBody>
            <TableRow>
              <TableCell className="py-2 px-4 w-48 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.workMode}</TableCell>
              <TableCell className="py-2 px-4">
                {editMode ? (
                  <Select value={editDetail.workMode} onValueChange={v => setEditDetail(d => ({ ...d, workMode: v }))}>
                    <SelectTrigger className="w-48"><SelectValue /></SelectTrigger>
                    <SelectContent>
                      <SelectItem value="24時間稼働">24時間稼働</SelectItem>
                      <SelectItem value="稼働時間設定">稼働時間設定</SelectItem>
                    </SelectContent>
                  </Select>
                ) : (
                  detail.workMode
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 px-4 w-48 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.workPeriod}</TableCell>
              <TableCell className="py-2 px-4">
                {editMode ? (
                  <Input value={editDetail.workPeriod} onChange={e => setEditDetail(d => ({ ...d, workPeriod: e.target.value }))} />
                ) : (
                  detail.workPeriod
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 px-4 w-48 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.workDays}</TableCell>
              <TableCell className="py-2 px-4">
                {editMode ? (
                  <Input value={editDetail.workDays} onChange={e => setEditDetail(d => ({ ...d, workDays: e.target.value }))} />
                ) : (
                  detail.workDays
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 px-4 w-48 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.workTime}</TableCell>
              <TableCell className="py-2 px-4">
                {editMode ? (
                  <Input value={editDetail.workTime} onChange={e => setEditDetail(d => ({ ...d, workTime: e.target.value }))} />
                ) : (
                  detail.workTime
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 px-4 w-48 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.inAction}</TableCell>
              <TableCell className="py-2 px-4">
                {editMode ? (
                  <Input value={editDetail.inAction} onChange={e => setEditDetail(d => ({ ...d, inAction: e.target.value }))} />
                ) : (
                  <>
                    動作：シナリオ<br /><span className="text-[#5B7FFF] underline cursor-pointer">{detail.inAction}</span>
                  </>
                )}
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell className="py-2 px-4 w-48 text-gray-600 bg-[#F5F6FB]">{NUMBER_DETAIL_TEXTS.table.outAction}</TableCell>
              <TableCell className="py-2 px-4">
                {editMode ? (
                  <Input value={editDetail.outAction} onChange={e => setEditDetail(d => ({ ...d, outAction: e.target.value }))} />
                ) : (
                  <>
                    動作：シナリオ<br /><span className="text-[#5B7FFF] underline cursor-pointer">{detail.outAction}</span>
                  </>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
        <h2 className="text-xl font-bold mb-4" style={{ color: '#3B3172' }}>{NUMBER_DETAIL_TEXTS.info.history}</h2>
        <Table className="text-base bg-white rounded-xl border" style={{ borderColor: '#E0E0F0' }}>
          <TableHeader>
            <TableRow>
              <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">{NUMBER_DETAIL_TEXTS.logTable.date}</TableHead>
              <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">{NUMBER_DETAIL_TEXTS.logTable.action}</TableHead>
              <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">{NUMBER_DETAIL_TEXTS.logTable.scenario}</TableHead>
              <TableHead className="py-2 px-4 bg-[#5B7FFF] text-white font-semibold">{NUMBER_DETAIL_TEXTS.logTable.updater}</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {detail.logs.map((log, i) => (
              <TableRow key={i} className="border-b last:border-b-0">
                <TableCell className="py-2 px-4">{log.date}</TableCell>
                <TableCell className="py-2 px-4">{log.action}</TableCell>
                <TableCell className="py-2 px-4">{log.scenario}</TableCell>
                <TableCell className="py-2 px-4">{log.updater}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  );
} 