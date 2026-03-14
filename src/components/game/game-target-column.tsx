"use client";

import type { Pair, PairId, Placements } from "@/components/game/game-data";
import { DropSlot } from "@/components/game/drop-slot";

type GameTargetColumnProps = {
  rightColumnOrder: Pair[];
  allPairs: Pair[];
  placements: Placements;
  recentMatchId: PairId | null;
  onMount: (pairId: PairId, element: HTMLDivElement | null) => void;
};

export function GameTargetColumn({
  rightColumnOrder,
  allPairs,
  placements,
  recentMatchId,
  onMount,
}: GameTargetColumnProps) {
  return (
    <div className="min-w-0 rounded-[1.5rem] border border-slate-200/80 bg-slate-950 p-3 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)] sm:rounded-3xl sm:p-5">
      <div className="mb-3 sm:mb-4">
        <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-400 sm:text-sm sm:tracking-[0.2em]">
          Português
        </p>
        <h2 className="text-base font-bold sm:text-2xl">Solte no significado certo</h2>
      </div>

      <div className="space-y-3">
        {rightColumnOrder.map((pair) => (
          <DropSlot
            key={pair.id}
            pair={pair}
            filledBy={placements[pair.id]}
            celebrating={recentMatchId === pair.id}
            matchedWord={allPairs.find((item) => item.id === placements[pair.id])?.esquerda}
            onMount={(element) => {
              onMount(pair.id, element);
            }}
          />
        ))}
      </div>
    </div>
  );
}
