"use client";

import type { FlyingMatch, Pair, PairId, Placements } from "@/components/game/game-data";
import { DraggableWord } from "@/components/game/draggable-word";

type GameSourceColumnProps = {
  roundPairs: Pair[];
  placements: Placements;
  recentMatchId: PairId | null;
  flyingMatch: FlyingMatch | null;
  onMount: (pairId: PairId, element: HTMLDivElement | null) => void;
};

export function GameSourceColumn({
  roundPairs,
  placements,
  recentMatchId,
  flyingMatch,
  onMount,
}: GameSourceColumnProps) {
  return (
    <div className="min-w-0 rounded-[1.5rem] border border-slate-200/80 bg-white/85 p-3 shadow-[0_18px_50px_rgba(15,23,42,0.08)] sm:rounded-3xl sm:p-5">
      <div className="mb-3 flex flex-col gap-2 sm:mb-4 sm:flex-row sm:items-center sm:justify-between sm:gap-3">
        <div className="min-w-0">
          <p className="text-[10px] font-semibold uppercase tracking-[0.08em] text-slate-500 sm:text-sm sm:tracking-[0.2em]">
            Can I Have... + Complemento
          </p>
          <h2 className="text-base font-bold text-slate-900 sm:text-2xl">Arraste estes cards</h2>
        </div>
      </div>

      <div className="space-y-3">
        {roundPairs.map((pair) => (
          <DraggableWord
            key={pair.id}
            pair={pair}
            matched={placements[pair.id] != null}
            celebrating={recentMatchId === pair.id}
            flyingOut={flyingMatch?.id === pair.id}
            onMount={(element) => {
              onMount(pair.id, element);
            }}
          />
        ))}
      </div>
    </div>
  );
}
