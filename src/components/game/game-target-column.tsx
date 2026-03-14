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
    <div className="rounded-3xl border border-slate-200/80 bg-slate-950 p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)]">
      <div className="mb-4">
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
          Português
        </p>
        <h2 className="text-2xl font-bold">Solte no significado certo</h2>
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
