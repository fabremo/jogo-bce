"use client";

import { RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";

type GameHeaderProps = {
  acertos: number;
  total: number;
  onReset: () => void;
};

export function GameHeader({ acertos, total, onReset }: GameHeaderProps) {
  return (
    <section className="flex flex-col gap-3 sm:flex-row">
      <ScoreCard label="Acertos" value={`${acertos}/${total}`} />
      <Button
        variant="outline"
        className="h-12 rounded-2xl border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
        onClick={onReset}
      >
        <RotateCcw className="size-4" />
        Reiniciar
      </Button>
    </section>
  );
}

function ScoreCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}
