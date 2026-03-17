"use client";

import { RotateCcw } from "lucide-react";

import type { GameMode } from "@/components/game/game-data";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type GameHeaderProps = {
  acertos: number;
  total: number;
  selectedMode: string;
  availableModes: GameMode[];
  onModeChange: (modeId: string) => void;
  onReset: () => void;
};

export function GameHeader({
  acertos,
  total,
  selectedMode,
  availableModes,
  onModeChange,
  onReset,
}: GameHeaderProps) {
  return (
    <section className="flex flex-col gap-3">
      <div className="flex justify-center">
        <Select value={selectedMode} onValueChange={onModeChange}>
          <SelectTrigger className="max-w-md">
            <SelectValue placeholder="Selecione o modo" />
          </SelectTrigger>
          <SelectContent>
            {availableModes.map((mode) => (
              <SelectItem key={mode.id} value={mode.id}>
                {mode.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div className="flex flex-col gap-3 text-center sm:flex-row sm:items-stretch">
        <ScoreCard label="Acertos" value={`${acertos}/${total}`} />
        <Button
          variant="outline"
          className="h-12 w-full rounded-2xl border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50 sm:w-auto"
          onClick={onReset}
        >
          <RotateCcw className="size-4" />
          Reiniciar
        </Button>
      </div>
    </section>
  );
}

function ScoreCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="w-full rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3 sm:w-auto">
      <p className="text-[11px] font-semibold uppercase tracking-[0.14em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
        {label}
      </p>
      <p className="text-xl font-black text-slate-900 sm:text-2xl">{value}</p>
    </div>
  );
}
