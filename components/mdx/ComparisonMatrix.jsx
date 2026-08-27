"use client";
import { CheckCircle2, XCircle } from "lucide-react";

export default function ComparisonMatrix({ title, leftTitle, rightTitle, rows }) {
  return (
    <div className="my-8 rounded-xl border border-white/10 bg-[#161b22] overflow-hidden shadow-xl">
      {title && (
        <div className="bg-[#21262d] px-6 py-4 border-b border-white/10">
          <h3 className="text-lg font-bold text-white m-0">{title}</h3>
        </div>
      )}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse m-0">
          <thead>
            <tr>
              <th className="px-6 py-4 border-b border-white/10 text-textTertiary font-semibold uppercase tracking-wider text-xs bg-white/5">Concept</th>
              <th className="px-6 py-4 border-b border-white/10 text-blue-400 font-bold bg-blue-500/5">{leftTitle}</th>
              <th className="px-6 py-4 border-b border-white/10 text-emerald-400 font-bold bg-emerald-500/5">{rightTitle}</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {rows.map((row, idx) => (
              <tr key={idx} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 text-sm font-medium text-white align-top whitespace-nowrap">{row.concept}</td>
                <td className="px-6 py-4 text-sm text-textSecondary align-top bg-blue-500/5">
                  <div className="flex items-start gap-2">
                    {row.leftIcon === "check" && <CheckCircle2 size={16} className="text-blue-400 shrink-0 mt-0.5" />}
                    {row.leftIcon === "cross" && <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />}
                    <span>{row.left}</span>
                  </div>
                </td>
                <td className="px-6 py-4 text-sm text-textSecondary align-top bg-emerald-500/5">
                  <div className="flex items-start gap-2">
                    {row.rightIcon === "check" && <CheckCircle2 size={16} className="text-emerald-400 shrink-0 mt-0.5" />}
                    {row.rightIcon === "cross" && <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />}
                    <span>{row.right}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
