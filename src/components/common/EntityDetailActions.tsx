"use client";
import { Button } from '@/components/ui/button';

interface EntityDetailActionsProps {
  onEdit: () => void;
  onDelete: () => void;
  editLabel?: string;
  deleteLabel?: string;
}

export function EntityDetailActions({ onEdit, onDelete, editLabel = "編集", deleteLabel = "削除" }: EntityDetailActionsProps) {
  return (
    <div className="flex gap-2">
      <Button style={{ background: '#00CFFF', color: '#fff', fontWeight: 600 }} onClick={onEdit}>{editLabel}</Button>
      <Button style={{ background: '#F87171', color: '#fff', fontWeight: 600 }} onClick={onDelete}>{deleteLabel}</Button>
    </div>
  );
} 