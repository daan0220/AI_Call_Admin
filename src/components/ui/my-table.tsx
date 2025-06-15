import * as React from "react";
import { cn } from "@/lib/utils";

export function MyTable({ columns, rows }: { columns: { key: string; label: string }[]; rows: any[] }) {
  return (
    <table className="w-full text-sm mb-4 rounded-xl shadow-md bg-white" style={{ border: '1px solid #D6E2FF' }}>
      <thead>
        <tr style={{ background: '#EEF4FF' }}>
          {columns.map(col => (
            <th key={col.key} className="py-2 px-3 font-semibold" style={{ color: '#5B7FFF' }}>{col.label}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.map((row, i) => (
          <tr key={i} className={i % 2 === 1 ? '' : ''}>
            {columns.map(col => (
              <td key={col.key} className="py-2 px-3 text-center">{row[col.key]}</td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
} 