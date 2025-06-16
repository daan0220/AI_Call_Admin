"use client";
import { useRouter } from "next/navigation";
import { TableRow } from "@/components/ui/table";
import React from "react";

type Props = React.ComponentProps<typeof TableRow> & {
  href: string;
};

export function ClickableTableRow({ href, children, ...rest }: Props) {
  const router = useRouter();
  return (
    <TableRow
      {...rest}
      className={`cursor-pointer hover:bg-[#EEF4FF] transition ${rest.className ?? ""}`}
      onClick={() => router.push(href)}
    >
      {children}
    </TableRow>
  );
} 