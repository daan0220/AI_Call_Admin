"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';

interface SearchForm {
  type: string;
  from: string;
  to: string;
  result: string;
}

interface SearchDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  searchForm: SearchForm;
  setSearchForm: (form: SearchForm) => void;
  trigger: React.ReactNode;
}

export function SearchDialog({ open, onOpenChange, searchForm, setSearchForm, trigger }: SearchDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="max-w-md rounded-xl">
        <DialogHeader>
          <DialogTitle>詳細検索</DialogTitle>
        </DialogHeader>
        <form className="space-y-4 px-2 py-2">
          <div>
            <label className="block mb-1">通話タイプ</label>
            <Select value={searchForm.type} onValueChange={v => setSearchForm({ ...searchForm, type: v })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全て</SelectItem>
                <SelectItem value="着信">着信</SelectItem>
                <SelectItem value="発信">発信</SelectItem>
                <SelectItem value="内線">内線</SelectItem>
                <SelectItem value="外線">外線</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block mb-1">発信元</label>
            <Input value={searchForm.from} onChange={e => setSearchForm({ ...searchForm, from: e.target.value })} />
          </div>
          <div>
            <label className="block mb-1">着信先</label>
            <Input value={searchForm.to} onChange={e => setSearchForm({ ...searchForm, to: e.target.value })} />
          </div>
          <div>
            <label className="block mb-1">通話結果</label>
            <Select value={searchForm.result} onValueChange={v => setSearchForm({ ...searchForm, result: v })}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="選択してください" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">全て</SelectItem>
                <SelectItem value="顧客切断">顧客切断</SelectItem>
                <SelectItem value="終話">終話</SelectItem>
                <SelectItem value="折り返し必要">折り返し必要</SelectItem>
                <SelectItem value="留守電あり">留守電あり</SelectItem>
                <SelectItem value="取次完了">取次完了</SelectItem>
                <SelectItem value="留守電あり(予算上限超過)">留守電あり(予算上限超過)</SelectItem>
                <SelectItem value="留守電あり(シナリオ紐づいてない)">留守電あり(シナリオ紐づいてない)</SelectItem>
                <SelectItem value="不在着信">不在着信</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="flex justify-center gap-4 mt-6">
            <Button type="button" variant="outline" onClick={() => setSearchForm({ type: '', from: '', to: '', result: '' })}>クリア</Button>
            <Button type="submit" style={{ background: '#7C6CF6', color: '#fff' }}>検索</Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
} 