"use client"

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { LAYOUT_STYLES, COLORS, TABLE_STYLES } from "@/constants/styles";
import { HolidayTable, Holiday } from '@/components/holidays/HolidayTable';
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/ui/pagination';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { DeleteHolidayDialog } from '@/components/holidays/DeleteHolidayDialog';
import { HOLIDAYS_LIST_TEXTS } from '@/constants/texts';

// 2025〜2030年の日本の祝日データ（曜日は後で自動計算）
const rawHolidays = [
  // 2025年
  ["2025-01-01", "元日"], ["2025-01-13", "成人の日"], ["2025-02-11", "建国記念の日"], ["2025-02-23", "天皇誕生日"], ["2025-02-24", "振替休日"], ["2025-03-20", "春分の日"], ["2025-04-29", "昭和の日"], ["2025-05-03", "憲法記念日"], ["2025-05-04", "みどりの日"], ["2025-05-05", "こどもの日"], ["2025-05-06", "振替休日"], ["2025-07-21", "海の日"], ["2025-08-11", "山の日"], ["2025-09-15", "敬老の日"], ["2025-09-23", "秋分の日"], ["2025-10-13", "スポーツの日"], ["2025-11-03", "文化の日"], ["2025-11-23", "勤労感謝の日"], ["2025-11-24", "振替休日"],
  // 2026年
  ["2026-01-01", "元日"], ["2026-01-12", "成人の日"], ["2026-02-11", "建国記念の日"], ["2026-02-23", "天皇誕生日"], ["2026-03-20", "春分の日"], ["2026-04-29", "昭和の日"], ["2026-05-03", "憲法記念日"], ["2026-05-04", "みどりの日"], ["2026-05-05", "こどもの日"], ["2026-05-06", "振替休日"], ["2026-07-20", "海の日"], ["2026-08-11", "山の日"], ["2026-09-21", "敬老の日"], ["2026-09-22", "国民の休日"], ["2026-09-23", "秋分の日"], ["2026-10-12", "スポーツの日"], ["2026-11-03", "文化の日"], ["2026-11-23", "勤労感謝の日"],
  // 2027年
  ["2027-01-01", "元日"], ["2027-01-11", "成人の日"], ["2027-02-11", "建国記念の日"], ["2027-02-23", "天皇誕生日"], ["2027-03-21", "春分の日"], ["2027-04-29", "昭和の日"], ["2027-05-03", "憲法記念日"], ["2027-05-04", "みどりの日"], ["2027-05-05", "こどもの日"], ["2027-05-06", "振替休日"], ["2027-07-19", "海の日"], ["2027-08-11", "山の日"], ["2027-09-20", "敬老の日"], ["2027-09-23", "秋分の日"], ["2027-10-11", "スポーツの日"], ["2027-11-03", "文化の日"], ["2027-11-23", "勤労感謝の日"],
  // 2028年
  ["2028-01-01", "元日"], ["2028-01-10", "成人の日"], ["2028-02-11", "建国記念の日"], ["2028-02-23", "天皇誕生日"], ["2028-03-20", "春分の日"], ["2028-04-29", "昭和の日"], ["2028-05-03", "憲法記念日"], ["2028-05-04", "みどりの日"], ["2028-05-05", "こどもの日"], ["2028-05-06", "振替休日"], ["2028-07-17", "海の日"], ["2028-08-11", "山の日"], ["2028-09-18", "敬老の日"], ["2028-09-22", "国民の休日"], ["2028-09-23", "秋分の日"], ["2028-10-09", "スポーツの日"], ["2028-11-03", "文化の日"], ["2028-11-23", "勤労感謝の日"],
  // 2029年
  ["2029-01-01", "元日"], ["2029-01-08", "成人の日"], ["2029-02-11", "建国記念の日"], ["2029-02-12", "振替休日"], ["2029-02-23", "天皇誕生日"], ["2029-03-20", "春分の日"], ["2029-04-29", "昭和の日"], ["2029-05-03", "憲法記念日"], ["2029-05-04", "みどりの日"], ["2029-05-05", "こどもの日"], ["2029-05-06", "振替休日"], ["2029-07-16", "海の日"], ["2029-08-11", "山の日"], ["2029-09-17", "敬老の日"], ["2029-09-23", "秋分の日"], ["2029-09-24", "振替休日"], ["2029-10-08", "スポーツの日"], ["2029-11-03", "文化の日"], ["2029-11-23", "勤労感謝の日"],
  // 2030年
  ["2030-01-01", "元日"], ["2030-01-14", "成人の日"], ["2030-02-11", "建国記念の日"], ["2030-02-23", "天皇誕生日"], ["2030-03-20", "春分の日"], ["2030-04-29", "昭和の日"], ["2030-05-03", "憲法記念日"], ["2030-05-04", "みどりの日"], ["2030-05-05", "こどもの日"], ["2030-05-06", "振替休日"], ["2030-07-15", "海の日"], ["2030-08-11", "山の日"], ["2030-08-12", "振替休日"], ["2030-09-16", "敬老の日"], ["2030-09-23", "秋分の日"], ["2030-10-14", "スポーツの日"], ["2030-11-03", "文化の日"], ["2030-11-04", "振替休日"], ["2030-11-23", "勤労感謝の日"],
];

function getDayOfWeek(dateStr: string) {
  const days = ['日', '月', '火', '水', '木', '金', '土'];
  const d = new Date(dateStr);
  return days[d.getDay()];
}

const holidays: Holiday[] = rawHolidays.map(([date, name]) => ({
  date,
  dayOfWeek: getDayOfWeek(date),
  name,
  note: '',
  createdAt: date + ' 00:00:00',
  updatedAt: date + ' 00:00:00',
}));

export default function HolidaysPage() {
  const router = useRouter();
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedHoliday, setSelectedHoliday] = useState<Holiday | null>(null);
  const totalCount = holidays.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const pagedData = holidays.slice((page - 1) * pageSize, page * pageSize);

  // ページサイズ変更時は1ページ目に戻す
  const handlePageSizeChange = (size: number) => {
    setPageSize(size);
    setPage(1);
  };

  // ページ番号配列生成（shadcn流）
  function getPageNumbers(current: number, total: number) {
    const delta = 2;
    const range = [];
    for (let i = Math.max(2, current - delta); i <= Math.min(total - 1, current + delta); i++) {
      range.push(i);
    }
    if (current - delta > 2) range.unshift('ellipsis-prev');
    if (current + delta < total - 1) range.push('ellipsis-next');
    range.unshift(1);
    if (total > 1) range.push(total);
    return range;
  }
  const pageNumbers = getPageNumbers(page, totalPages);

  // 編集ボタン押下時の遷移
  const handleEdit = (holiday: Holiday) => {
    router.push(`/holidays/${holiday.date}/edit`);
  };

  // 削除ボタン押下時の処理
  const handleDelete = (holiday: Holiday) => {
    setSelectedHoliday(holiday);
    setDeleteDialogOpen(true);
  };

  // 実際の削除処理
  const handleDeleteConfirm = () => {
    // TODO: 削除API呼び出しやリスト更新処理
    setDeleteDialogOpen(false);
    setSelectedHoliday(null);
  };

  return (
    <div className={LAYOUT_STYLES.container}>
      <h1 className={LAYOUT_STYLES.pageTitle} style={{ color: COLORS.primary, marginBottom: 12 }}>
        {HOLIDAYS_LIST_TEXTS.pageTitle}
      </h1>
      <Card className="p-8" style={{ borderColor: COLORS.border, marginTop: 0 }}>
        <div className="flex mb-4 gap-2">
          <Button style={{ background: '#FFE066', color: '#333' }}>
            {HOLIDAYS_LIST_TEXTS.newButton}
          </Button>
        </div>
        <HolidayTable data={pagedData} onEdit={handleEdit} onDelete={handleDelete}/>
        <DeleteHolidayDialog
          open={deleteDialogOpen}
          onOpenChange={setDeleteDialogOpen}
          holiday={selectedHoliday}
          onDelete={handleDeleteConfirm}
          onCancel={() => { setDeleteDialogOpen(false); setSelectedHoliday(null); }}
        />
        <div className="flex items-center justify-between w-full mt-8 mb-6 px-0">
          <div className="flex items-center gap-2 text-[15px] text-[#6B687A] font-bold min-w-[320px]">
            <span>{HOLIDAYS_LIST_TEXTS.pagination.rowsPerPage}</span>
            <select
              className="border border-[#E0E0E0] rounded-md px-2 py-1 h-[32px] focus:outline-none bg-white text-[#6B687A] font-bold text-[15px] shadow-sm"
              value={pageSize}
              onChange={e => handlePageSizeChange(Number(e.target.value))}
              style={{ minWidth: 56 }}
            >
              {[10, 20, 50, 100].map(opt => (
                <option key={opt} value={opt}>{opt}</option>
              ))}
            </select>
            <span className="ml-2 text-[15px] font-bold text-[#6B687A]">{(page - 1) * pageSize + 1}~{Math.min(page * pageSize, totalCount)} / {totalCount} {HOLIDAYS_LIST_TEXTS.pagination.rows}</span>
          </div>
          <div className="flex-1 flex justify-end">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={() => page > 1 && setPage(page - 1)}
                    aria-disabled={page === 1}
                    tabIndex={page === 1 ? -1 : 0}
                  />
                </PaginationItem>
                {pageNumbers.map((num, i) =>
                  num === 'ellipsis-prev' ? (
                    <PaginationItem key={num + i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : num === 'ellipsis-next' ? (
                    <PaginationItem key={num + i}>
                      <PaginationEllipsis />
                    </PaginationItem>
                  ) : (
                    <PaginationItem key={num}>
                      <PaginationLink
                        isActive={num === page}
                        onClick={() => setPage(Number(num))}
                        aria-current={num === page ? 'page' : undefined}
                      >
                        {num}
                      </PaginationLink>
                    </PaginationItem>
                  )
                )}
                <PaginationItem>
                  <PaginationNext
                    onClick={() => page < totalPages && setPage(page + 1)}
                    aria-disabled={page === totalPages}
                    tabIndex={page === totalPages ? -1 : 0}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
      </div>
      </Card>
    </div>
  );
} 