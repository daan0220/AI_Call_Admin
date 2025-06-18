"use client";
import { Button } from '@/components/ui/button';

interface HolidayDetailActionsProps {
  onEdit: () => void;
  onDelete: () => void;
}

export function HolidayDetailActions({ onEdit, onDelete }: HolidayDetailActionsProps) {
  return (
    <div className="flex gap-2">
      <Button style={{ background: '#00CFFF', color: '#fff', fontWeight: 600 }} onClick={onEdit}>編集</Button>
      <Button style={{ background: '#F87171', color: '#fff', fontWeight: 600 }} onClick={onDelete}>削除</Button>
    </div>
  );
} 