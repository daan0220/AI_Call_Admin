"use client";
import { useRouter } from "next/navigation";
import { TableRow } from "@/components/ui/table";
import React from "react";

type Props = React.ComponentProps<typeof TableRow> & {
  href: string;
};

export function ClickableTableRow({ href, children, ...rest }: Props) {
  const router = useRouter();
  // 行クリック時の遷移
  const handleRowClick = (e: React.MouseEvent<HTMLTableRowElement>) => {
    // クリック元がボタンやaタグ、DialogTrigger等なら遷移しない
    const tag = (e.target as HTMLElement).tagName;
    if (tag === 'BUTTON' || tag === 'A' || tag === 'INPUT' || tag === 'SELECT' || tag === 'LABEL') return;
    // data-no-row-link属性が付与されている要素も遷移しない
    if ((e.target as HTMLElement).closest('[data-no-row-link]')) return;
    router.push(href);
  };
  return (
    <TableRow
      {...rest}
      className={`cursor-pointer hover:bg-[#EEF4FF] transition ${rest.className ?? ""}`}
      onClick={handleRowClick}
    >
      {children}
    </TableRow>
  );
} 