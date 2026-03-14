"use client";

import { useDraggable } from "@dnd-kit/react";

import type { Pair } from "@/components/game/game-data";
import { getDragId } from "@/components/game/game-utils";
import { cn } from "@/lib/utils";

type DraggableWordProps = {
  pair: Pair;
  matched: boolean;
  celebrating: boolean;
  flyingOut: boolean;
  onMount: (element: HTMLDivElement | null) => void;
};

export function DraggableWord({
  pair,
  matched,
  celebrating,
  flyingOut,
  onMount,
}: DraggableWordProps) {
  const { ref, isDragging } = useDraggable({
    id: getDragId(pair.id),
    disabled: matched,
  });

  return (
    <div
      ref={(element) => {
        ref(element);
        onMount(element as HTMLDivElement | null);
      }}
      className={cn(
        "select-none rounded-xl border px-2.5 py-2.5 transition-all sm:rounded-2xl sm:px-5 sm:py-4",
        matched
          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 shadow-none"
          : "cursor-grab border-slate-200 bg-white text-slate-900 shadow-sm hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md",
        isDragging && "scale-[1.02] cursor-grabbing border-emerald-400 opacity-70 shadow-xl",
        celebrating && "animate-match-pop",
        flyingOut && "opacity-25 saturate-0"
      )}
    >
      <div className="flex items-center justify-between gap-2 sm:gap-4">
        <div className="min-w-0">
          <p className="mt-1 break-words text-sm font-black leading-tight sm:text-2xl">
            {pair.esquerda}
          </p>
        </div>

        {matched ? null : (
          <span className="shrink-0 rounded-full bg-slate-100 px-2 py-1 text-[10px] font-medium text-slate-600 sm:px-3 sm:text-sm">
            Arraste
          </span>
        )}
      </div>
    </div>
  );
}
