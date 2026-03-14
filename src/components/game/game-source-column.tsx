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
  const remainingCount = roundPairs.filter((pair) => placements[pair.id] == null).length;

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
            Can I Have... + Complemento
          </p>
          <h2 className="text-2xl font-bold text-slate-900">Arraste estes cards</h2>
        </div>
        <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
          {remainingCount} restantes
        </span>
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
