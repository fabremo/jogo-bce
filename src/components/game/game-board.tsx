"use client";

import { useEffect, useRef, useState, type CSSProperties } from "react";
import { DragDropProvider, DragOverlay } from "@dnd-kit/react";

import { CompletionDialog } from "@/components/game/completion-dialog";
import {
  type FlyingMatch,
  type Pair,
  type PairId,
  type Placements,
  MATCH_POP_DURATION_MS,
} from "@/components/game/game-data";
import { GameHeader } from "@/components/game/game-header";
import { GameSourceColumn } from "@/components/game/game-source-column";
import { GameStatus } from "@/components/game/game-status";
import { GameTargetColumn } from "@/components/game/game-target-column";
import {
  getBoxSnapshot,
  getPairIdFromDragId,
  getPairIdFromDropId,
  pickRandomPairs,
  shufflePairs,
} from "@/components/game/game-utils";

type GameBoardProps = {
  pairs: Pair[];
  roundSize: number;
  materialPdfPath: string;
};

export function GameBoard({ pairs, roundSize, materialPdfPath }: GameBoardProps) {
  const [roundPairs, setRoundPairs] = useState(() => pairs.slice(0, roundSize));
  const [placements, setPlacements] = useState<Placements>({});
  const [activeSourceId, setActiveSourceId] = useState<PairId | null>(null);
  const [rightColumnOrder, setRightColumnOrder] = useState(() => pairs.slice(0, roundSize));
  const [isCompletionDialogOpen, setIsCompletionDialogOpen] = useState(false);
  const [recentMatchId, setRecentMatchId] = useState<PairId | null>(null);
  const [flyingMatch, setFlyingMatch] = useState<FlyingMatch | null>(null);
  const sourceRefs = useRef(new Map<PairId, HTMLDivElement | null>());
  const targetRefs = useRef(new Map<PairId, HTMLDivElement | null>());

  const total = roundPairs.length;
  const acertos = Object.keys(placements).length;
  const concluiu = acertos === total;

  function resetGame() {
    const nextRound = pickRandomPairs(pairs, roundSize);

    setPlacements({});
    setActiveSourceId(null);
    setIsCompletionDialogOpen(false);
    setRecentMatchId(null);
    setFlyingMatch(null);
    setRoundPairs(nextRound);
    setRightColumnOrder(shufflePairs(nextRound));
  }

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      const nextRound = pickRandomPairs(pairs, roundSize);

      setRoundPairs(nextRound);
      setRightColumnOrder(shufflePairs(nextRound));
    }, 0);

    return () => window.clearTimeout(timeout);
  }, [pairs, roundSize]);

  useEffect(() => {
    if (recentMatchId == null) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setRecentMatchId(null);
    }, MATCH_POP_DURATION_MS);

    return () => window.clearTimeout(timeout);
  }, [recentMatchId]);

  useEffect(() => {
    if (flyingMatch == null) {
      return;
    }

    const timeout = window.setTimeout(() => {
      setFlyingMatch(null);
    }, 520);

    return () => window.clearTimeout(timeout);
  }, [flyingMatch]);

  return (
    <>
      <GameHeader acertos={acertos} total={total} onReset={resetGame} />

      <DragDropProvider
        onDragStart={(event) => {
          const sourceId = getPairIdFromDragId(event.operation.source?.id);
          setActiveSourceId(sourceId);
        }}
        onDragEnd={(event) => {
          const sourceId = getPairIdFromDragId(event.operation.source?.id);
          const targetId = getPairIdFromDropId(event.operation.target?.id);

          if (!event.canceled && sourceId != null && targetId === sourceId) {
            const sourceElement = sourceRefs.current.get(sourceId);
            const targetElement = targetRefs.current.get(targetId);
            const isLastMatch = acertos + 1 === total;

            if (sourceElement && targetElement) {
              setFlyingMatch({
                id: sourceId,
                from: getBoxSnapshot(sourceElement),
                to: getBoxSnapshot(targetElement),
              });
            }

            setPlacements((current) => ({
              ...current,
              [targetId]: sourceId,
            }));
            setRecentMatchId(targetId);

            if (isLastMatch) {
              window.setTimeout(() => {
                setIsCompletionDialogOpen(true);
              }, MATCH_POP_DURATION_MS);
            }
          }

          setActiveSourceId(null);
        }}
      >
        <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <GameSourceColumn
            roundPairs={roundPairs}
            placements={placements}
            recentMatchId={recentMatchId}
            flyingMatch={flyingMatch}
            onMount={(pairId, element) => {
              sourceRefs.current.set(pairId, element);
            }}
          />

          <GameTargetColumn
            rightColumnOrder={rightColumnOrder}
            allPairs={pairs}
            placements={placements}
            recentMatchId={recentMatchId}
            onMount={(pairId, element) => {
              targetRefs.current.set(pairId, element);
            }}
          />
        </section>

        <DragOverlay className="pointer-events-none fixed left-0 top-0 z-50">
          {activeSourceId != null ? (
            <div className="rounded-2xl border border-emerald-300 bg-emerald-100 px-5 py-4 text-base font-bold text-emerald-950 shadow-2xl">
              Can I have...
            </div>
          ) : null}
        </DragOverlay>

        {flyingMatch != null ? (
          <div
            className="pointer-events-none fixed z-60 rounded-2xl border border-emerald-300 bg-emerald-100 px-5 py-4 text-base font-bold text-emerald-950 shadow-2xl animate-match-transfer"
            style={
              {
                top: `${flyingMatch.from.top}px`,
                left: `${flyingMatch.from.left}px`,
                width: `${flyingMatch.from.width}px`,
                height: `${flyingMatch.from.height}px`,
                "--match-x": `${flyingMatch.to.left - flyingMatch.from.left}px`,
                "--match-y": `${flyingMatch.to.top - flyingMatch.from.top}px`,
                "--match-scale-x": `${flyingMatch.to.width / flyingMatch.from.width}`,
                "--match-scale-y": `${flyingMatch.to.height / flyingMatch.from.height}`,
              } as CSSProperties
            }
          >
            <div className="flex h-full items-center justify-between gap-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">
                  Palavra
                </p>
                <p className="mt-1 text-2xl font-black">Can I have...</p>
              </div>
              <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-semibold text-white">
                Encaixando
              </span>
            </div>
          </div>
        ) : null}
      </DragDropProvider>

      <GameStatus concluiu={concluiu} />

      <CompletionDialog
        open={concluiu && isCompletionDialogOpen}
        acertos={acertos}
        total={total}
        materialPdfPath={materialPdfPath}
        onOpenChange={setIsCompletionDialogOpen}
        onReset={resetGame}
      />
    </>
  );
}
