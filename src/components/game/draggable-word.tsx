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
        "select-none rounded-2xl border px-5 py-4 transition-all",
        matched
          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 shadow-none"
          : "cursor-grab border-slate-200 bg-white text-slate-900 shadow-sm hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md",
        isDragging && "scale-[1.02] cursor-grabbing border-emerald-400 opacity-70 shadow-xl",
        celebrating && "animate-match-pop",
        flyingOut && "opacity-25 saturate-0"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="mt-1 text-2xl font-black">{pair.esquerda}</p>
        </div>

        {matched ? null : (
          <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
            Arraste
          </span>
        )}
      </div>
    </div>
  );
}
