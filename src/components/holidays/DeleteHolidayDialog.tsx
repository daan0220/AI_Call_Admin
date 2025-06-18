"use client";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { COLORS } from '@/constants/styles';
import { Holiday } from './HolidayTable';

interface DeleteHolidayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  holiday: Holiday | null;
  onDelete: () => void;
  onCancel?: () => void;
}

export function DeleteHolidayDialog({ open, onOpenChange, holiday, onDelete, onCancel }: DeleteHolidayDialogProps) {
  if (!holiday) return null;
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 rounded-lg">
        <DialogHeader className="bg-[#F87171] px-6 py-3 flex flex-row items-center justify-between rounded-t-lg mb-0 relative">
          <DialogTitle className="text-white text-lg text-center w-full">削除</DialogTitle>
          <DialogClose asChild>
          </DialogClose>
        </DialogHeader>
        <div className="px-6 py-8 text-center">
          <div className="mb-6 text-base text-[#222]">
            <span className="font-bold">{holiday.name}</span> 指定項目を削除すると復元できなくなります。<br />
            削除しますか？
          </div>
          <div className="flex justify-center gap-4 mt-4">
            <Button variant="outline" onClick={onCancel || (() => onOpenChange(false))}>キャンセル</Button>
            <Button style={{ background: '#F87171', color: '#fff' }} onClick={onDelete}>削除</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
} 