"use client";

import { Check } from "lucide-react";
import { useDroppable } from "@dnd-kit/react";

import type { Pair, PairId } from "@/components/game/game-data";
import { getDropId } from "@/components/game/game-utils";
import { cn } from "@/lib/utils";

type DropSlotProps = {
  pair: Pair;
  filledBy?: PairId;
  celebrating: boolean;
  matchedWord?: string;
  onMount: (element: HTMLDivElement | null) => void;
};

export function DropSlot({
  pair,
  filledBy,
  celebrating,
  matchedWord,
  onMount,
}: DropSlotProps) {
  const { ref, isDropTarget } = useDroppable({
    id: getDropId(pair.id),
  });

  const preenchido = filledBy != null;

  return (
    <div
      ref={(element) => {
        ref(element);
        onMount(element as HTMLDivElement | null);
      }}
      className={cn(
        "rounded-2xl border px-5 py-4 transition-all",
        preenchido
          ? "border-emerald-200 bg-emerald-50 text-emerald-900 shadow-sm"
          : "border-white/12 bg-white/6",
        isDropTarget && !preenchido && "border-cyan-300 bg-cyan-300/10",
        celebrating && "animate-match-pop"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p
            className={cn(
              "mt-1 text-2xl font-black",
              preenchido ? "text-slate-900" : "text-white"
            )}
          >
            {preenchido ? matchedWord : pair.direita}
          </p>
        </div>

        {preenchido ? (
          <span className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-3 py-1 text-sm font-semibold text-white">
            <Check className="size-4" />
            Acertou
          </span>
        ) : (
          <span className="rounded-full border border-dashed border-white/25 px-3 py-1 text-sm font-medium text-slate-300">
            Solte aqui
          </span>
        )}
      </div>
    </div>
  );
}
