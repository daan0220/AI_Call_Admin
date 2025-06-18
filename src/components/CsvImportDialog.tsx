import React, { useState } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { UploadCloud } from 'lucide-react';
import { CSV_IMPORT_DIALOG_TEXTS } from '@/constants/texts';

interface CsvImportDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  trigger?: React.ReactNode;
  title: string;
  description?: React.ReactNode;
  templateLabel?: string;
  onTemplateDownload?: () => void;
  onImport: (file: File) => void;
  importButtonLabel?: string;
  notes?: string[];
  accept?: string;
}

export function CsvImportDialog({
  open,
  onOpenChange,
  trigger,
  title,
  description,
  templateLabel = 'CSVテンプレートをダウンロード',
  onTemplateDownload,
  onImport,
  importButtonLabel = 'インポート',
  notes = [],
  accept = '.csv',
}: CsvImportDialogProps) {
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    setFile(f || null);
  };
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
    const f = e.dataTransfer.files?.[0];
    setFile(f || null);
  };
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(true);
  };
  const handleDragLeave = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setDragActive(false);
  };
  const handleImport = () => {
    if (file) {
      onImport(file);
      setFile(null);
    } else {
      alert(CSV_IMPORT_DIALOG_TEXTS.selectFile);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent className="max-w-lg rounded-xl p-0 overflow-hidden">
        <DialogHeader className="bg-[#5B7FFF] px-6 py-4">
          <DialogTitle className="text-white text-center text-lg">{title}</DialogTitle>
        </DialogHeader>
        <div className="px-8 py-6 text-base text-[#333]">
          {description && <div className="mb-4 text-sm leading-relaxed">{description}</div>}
          {onTemplateDownload && (
            <Button
              variant="outline"
              className="w-full mb-4 border-[#5B7FFF] text-[#5B7FFF] font-semibold"
              type="button"
              onClick={onTemplateDownload}
            >
              {templateLabel}
            </Button>
          )}
          <label
            htmlFor="csv-upload"
            className={`block border-2 border-dashed rounded-xl py-8 px-4 mb-4 cursor-pointer transition text-center ${dragActive ? 'border-[#5B7FFF] bg-blue-50' : 'border-[#C7D8FF] bg-white'}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            <UploadCloud size={64} className="mx-auto mb-2 text-[#5B7FFF]" />
            <div className="mb-2">{CSV_IMPORT_DIALOG_TEXTS.uploadText}<br />{CSV_IMPORT_DIALOG_TEXTS.dragDropText}</div>
            <input
              id="csv-upload"
              type="file"
              accept={accept}
              className="hidden"
              onChange={handleFileChange}
            />
            {file && <div className="mt-2 text-sm text-[#5B7FFF]">{CSV_IMPORT_DIALOG_TEXTS.selectedFile} {file.name}</div>}
          </label>
          {notes.length > 0 && (
            <ul className="text-xs text-left text-gray-500 leading-relaxed">
              {notes.map((note, i) => <li key={i}>{note}</li>)}
            </ul>
          )}
        </div>
        <div className="flex justify-center gap-4 pb-6">
          <DialogClose asChild>
            <Button variant="outline" className="w-32">{CSV_IMPORT_DIALOG_TEXTS.cancel}</Button>
          </DialogClose>
          <Button style={{ background: '#5B7FFF' }} className="w-32 text-white" type="button" onClick={handleImport}>{importButtonLabel}</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
} 