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
        "rounded-xl border px-2.5 py-2.5 transition-all sm:rounded-2xl sm:px-5 sm:py-4",
        preenchido
          ? "border-emerald-200 bg-emerald-50 text-emerald-900 shadow-sm"
          : "border-white/12 bg-white/6",
        isDropTarget && !preenchido && "border-cyan-300 bg-cyan-300/10",
        celebrating && "animate-match-pop"
      )}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="min-w-0">
          <p
            className={cn(
              "mt-1 wrap-break-word text-sm font-black leading-tight sm:text-2xl",
              preenchido ? "text-slate-900" : "text-white"
            )}
          >
            {preenchido ? matchedWord : pair.direita}
          </p>
        </div>

        {preenchido ? (
          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-emerald-600 px-2 py-1 text-[10px] font-semibold text-white sm:gap-2 sm:px-3 sm:text-sm">
            <Check className="size-3 sm:size-4" />
            Acertou
          </span>
        ) : (
          <span className="hidden shrink-0 rounded-full border border-dashed border-white/25 px-2 py-1 text-[10px] font-medium text-slate-300 sm:inline-flex sm:px-3 sm:text-sm">
            Solte aqui
          </span>
        )}
      </div>
    </div>
  );
}
