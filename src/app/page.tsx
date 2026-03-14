"use client";

import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  DragDropProvider,
  DragOverlay,
  useDraggable,
  useDroppable,
} from "@dnd-kit/react";
import { Check, RotateCcw, Sparkles } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pares = [
  { id: 1, esquerda: "dog", direita: "cachorro" },
  { id: 2, esquerda: "house", direita: "casa" },
  { id: 3, esquerda: "water", direita: "água" },
  { id: 4, esquerda: "pink", direita: "rosa" },
  { id: 5, esquerda: "head", direita: "cabeça" },
  { id: 6, esquerda: "cat", direita: "gato" },
  { id: 7, esquerda: "car", direita: "carro" },
  { id: 8, esquerda: "book", direita: "livro" },
  { id: 9, esquerda: "sun", direita: "sol" },
  { id: 10, esquerda: "moon", direita: "lua" },
  { id: 11, esquerda: "tree", direita: "árvore" },
  { id: 12, esquerda: "door", direita: "porta" },
  { id: 13, esquerda: "chair", direita: "cadeira" },
  { id: 14, esquerda: "table", direita: "mesa" },
  { id: 15, esquerda: "hand", direita: "mão" },
  { id: 16, esquerda: "foot", direita: "pé" },
  { id: 17, esquerda: "milk", direita: "leite" },
  { id: 18, esquerda: "bread", direita: "pão" },
  { id: 19, esquerda: "school", direita: "escola" },
  { id: 20, esquerda: "window", direita: "janela" },
];

type PairId = (typeof pares)[number]["id"];
type Placements = Partial<Record<PairId, PairId>>;
type BoxSnapshot = {
  top: number;
  left: number;
  width: number;
  height: number;
};
type FlyingMatch = {
  id: PairId;
  word: string;
  from: BoxSnapshot;
  to: BoxSnapshot;
};

export default function Home() {
  // `placements` guarda quais slots da direita já foram preenchidos corretamente.
  const [placements, setPlacements] = useState<Placements>({});
  // O item ativo alimenta o overlay visual enquanto o card está sendo arrastado.
  const [activeSourceId, setActiveSourceId] = useState<PairId | null>(null);
  // A coluna da direita embaralha só no cliente para evitar hydration mismatch.
  const [rightColumnOrder, setRightColumnOrder] = useState(pares);
  // `recentMatchId` dispara o feedback curto de acerto nos dois lados.
  const [recentMatchId, setRecentMatchId] = useState<PairId | null>(null);
  // `flyingMatch` desenha uma cópia temporária do card cruzando da esquerda para a direita.
  const [flyingMatch, setFlyingMatch] = useState<FlyingMatch | null>(null);
  // Guardamos refs dos cards e slots para medir as posições e animar o encaixe.
  const sourceRefs = useRef(new Map<PairId, HTMLDivElement | null>());
  const targetRefs = useRef(new Map<PairId, HTMLDivElement | null>());

  const total = pares.length;
  const acertos = Object.keys(placements).length;
  const concluiu = acertos === total;

  const palavrasAtivas = useMemo(
    () => pares.filter((par) => placements[par.id] == null),
    [placements]
  );

  function resetGame() {
    setPlacements({});
    setActiveSourceId(null);
    setRecentMatchId(null);
    setFlyingMatch(null);
    setRightColumnOrder(shufflePairs(pares));
  }

  useEffect(() => {
    // Faz o primeiro embaralhamento após o mount para manter o HTML inicial estável.
    const timeout = window.setTimeout(() => {
      setRightColumnOrder(shufflePairs(pares));
    }, 0);

    return () => window.clearTimeout(timeout);
  }, []);

  useEffect(() => {
    if (recentMatchId == null) {
      return;
    }

    // Limpa a animação curta de acerto para que ela possa ser reutilizada no próximo par.
    const timeout = window.setTimeout(() => {
      setRecentMatchId(null);
    }, 650);

    return () => window.clearTimeout(timeout);
  }, [recentMatchId]);

  useEffect(() => {
    if (flyingMatch == null) {
      return;
    }

    // Remove o card "voando" assim que a transição de encaixe termina.
    const timeout = window.setTimeout(() => {
      setFlyingMatch(null);
    }, 520);

    return () => window.clearTimeout(timeout);
  }, [flyingMatch]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.95),_rgba(241,245,249,0.92)_35%,_rgba(226,232,240,0.88)_100%)] px-4 py-8 text-foreground sm:px-6 lg:px-8">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <section className="overflow-hidden rounded-3xl border border-white/70 bg-white/85 p-6 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl space-y-4">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
                <Sparkles className="size-3.5" />
                Arraste e associe
              </span>
              <div className="space-y-3">
                <h1 className="text-4xl font-black tracking-tight text-slate-900 sm:text-5xl">
                  Ligue a palavra em inglês ao significado em português.
                </h1>
                <p className="max-w-xl text-base leading-7 text-slate-600 sm:text-lg">
                  Arrastou no lugar certo, pontuou. Quando todos os pares forem
                  encaixados, o tabuleiro fecha com pontuação máxima.
                </p>
              </div>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <ScoreCard label="Acertos" value={`${acertos}/${total}`} />
              <Button
                variant="outline"
                className="h-12 rounded-2xl border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm hover:bg-slate-50"
                onClick={resetGame}
              >
                <RotateCcw className="size-4" />
                Reiniciar
              </Button>
            </div>
          </div>
        </section>

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

              if (sourceElement && targetElement) {
                // Capturamos origem e destino antes de atualizar o layout para animar o "encaixe".
                setFlyingMatch({
                  id: sourceId,
                  word:
                    pares.find((par) => par.id === sourceId)?.esquerda ?? "",
                  from: getBoxSnapshot(sourceElement),
                  to: getBoxSnapshot(targetElement),
                });
              }

              setPlacements((current) => ({
                ...current,
                [targetId]: sourceId,
              }));
              setRecentMatchId(targetId);
            }

            setActiveSourceId(null);
          }}
        >
          <section className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
            <div className="rounded-3xl border border-slate-200/80 bg-white/85 p-5 shadow-[0_18px_50px_rgba(15,23,42,0.08)]">
              <div className="mb-4 flex items-center justify-between">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">
                    Inglês
                  </p>
                  <h2 className="text-2xl font-bold text-slate-900">
                    Arraste estes cards
                  </h2>
                </div>
                <span className="rounded-full bg-slate-100 px-3 py-1 text-sm font-medium text-slate-600">
                  {palavrasAtivas.length} restantes
                </span>
              </div>

              <div className="space-y-3">
                {pares.map((par) => (
                  <DraggableWord
                    key={par.id}
                    pair={par}
                    matched={placements[par.id] != null}
                    celebrating={recentMatchId === par.id}
                    flyingOut={flyingMatch?.id === par.id}
                    onMount={(element) => {
                      sourceRefs.current.set(par.id, element);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="rounded-3xl border border-slate-200/80 bg-slate-950 p-5 text-white shadow-[0_18px_50px_rgba(15,23,42,0.16)]">
              <div className="mb-4">
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-slate-400">
                  Português
                </p>
                <h2 className="text-2xl font-bold">Solte no significado certo</h2>
              </div>

              <div className="space-y-3">
                {rightColumnOrder.map((par) => (
                  <DropSlot
                    key={par.id}
                    pair={par}
                    filledBy={placements[par.id]}
                    celebrating={recentMatchId === par.id}
                    onMount={(element) => {
                      targetRefs.current.set(par.id, element);
                    }}
                  />
                ))}
              </div>
            </div>
          </section>

          <DragOverlay className="pointer-events-none fixed left-0 top-0 z-50">
            {activeSourceId != null ? (
              // O overlay mantém o card fora do fluxo da página durante o drag.
              <div className="rounded-2xl border border-emerald-300 bg-emerald-100 px-5 py-4 text-base font-bold text-emerald-950 shadow-2xl">
                {pares.find((par) => par.id === activeSourceId)?.esquerda}
              </div>
            ) : null}
          </DragOverlay>

          {flyingMatch != null ? (
            <div
              className="pointer-events-none fixed z-[60] rounded-2xl border border-emerald-300 bg-emerald-100 px-5 py-4 text-base font-bold text-emerald-950 shadow-2xl animate-match-transfer"
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
                  <p className="mt-1 text-2xl font-black">{flyingMatch.word}</p>
                </div>
                <span className="rounded-full bg-emerald-600 px-3 py-1 text-sm font-semibold text-white">
                  Encaixando
                </span>
              </div>
            </div>
          ) : null}
        </DragDropProvider>

        <section
          className={cn(
            "rounded-3xl border p-5 transition-all",
            concluiu
              ? "border-emerald-200 bg-emerald-50 text-emerald-950"
              : "border-slate-200 bg-white/80 text-slate-700"
          )}
        >
          <p className="text-sm font-semibold uppercase tracking-[0.2em]">
            Status
          </p>
          <p className="mt-2 text-lg font-semibold">
            {concluiu
              ? "Perfeito. Todos os pares foram associados."
              : "Continue arrastando as palavras para completar o quadro."}
          </p>
        </section>
      </main>
    </div>
  );
}

function ScoreCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
        {label}
      </p>
      <p className="text-2xl font-black text-slate-900">{value}</p>
    </div>
  );
}

function DraggableWord({
  pair,
  matched,
  celebrating,
  flyingOut,
  onMount,
}: {
  pair: (typeof pares)[number];
  matched: boolean;
  celebrating: boolean;
  flyingOut: boolean;
  onMount: (element: HTMLDivElement | null) => void;
}) {
  const { ref, isDragging } = useDraggable({
    id: getDragId(pair.id),
    disabled: matched,
  });

  return (
    <div
      ref={(element) => {
        // O mesmo elemento serve para o dnd-kit e para as medições da animação de transferência.
        ref(element);
        onMount(element as HTMLDivElement | null);
      }}
      className={cn(
        "rounded-2xl border px-5 py-4 transition-all select-none",
        matched
          ? "cursor-not-allowed border-slate-200 bg-slate-100 text-slate-400 shadow-none"
          : "cursor-grab border-slate-200 bg-white text-slate-900 shadow-sm hover:-translate-y-0.5 hover:border-emerald-300 hover:shadow-md",
        isDragging && "cursor-grabbing scale-[1.02] border-emerald-400 shadow-xl opacity-70",
        celebrating && "animate-match-pop",
        flyingOut && "opacity-25 saturate-0"
      )}
    >
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-slate-500">
            Palavra
          </p>
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

function DropSlot({
  pair,
  filledBy,
  celebrating,
  onMount,
}: {
  pair: (typeof pares)[number];
  filledBy?: PairId;
  celebrating: boolean;
  onMount: (element: HTMLDivElement | null) => void;
}) {
  const { ref, isDropTarget } = useDroppable({
    id: getDropId(pair.id),
  });

  const preenchido = filledBy != null;
  const palavraAssociada = pares.find((item) => item.id === filledBy)?.esquerda;

  return (
    <div
      ref={(element) => {
        // Registramos o slot para medir a posição final do card no momento do acerto.
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
              "text-xs font-semibold uppercase tracking-[0.18em]",
              preenchido ? "text-slate-500" : "text-slate-400"
            )}
          >
            {preenchido ? "Palavra" : "Significado"}
          </p>
          <p
            className={cn(
              "mt-1 text-2xl font-black",
              preenchido ? "text-slate-900" : "text-white"
            )}
          >
            {preenchido ? palavraAssociada : pair.direita}
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

function getDragId(pairId: PairId) {
  return `source-${pairId}`;
}

function getDropId(pairId: PairId) {
  return `target-${pairId}`;
}

// Os ids do dnd-kit recebem prefixos diferentes para separar claramente origem e destino.
function getPairIdFromDragId(id: string | number | undefined) {
  if (typeof id !== "string" || !id.startsWith("source-")) {
    return null;
  }

  const value = Number(id.replace("source-", ""));

  return Number.isNaN(value) ? null : (value as PairId);
}

function getPairIdFromDropId(id: string | number | undefined) {
  if (typeof id !== "string" || !id.startsWith("target-")) {
    return null;
  }

  const value = Number(id.replace("target-", ""));

  return Number.isNaN(value) ? null : (value as PairId);
}

function shufflePairs(items: typeof pares) {
  // Fisher-Yates simples para reembaralhar a coluna da direita a cada nova partida.
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const current = shuffled[index];

    shuffled[index] = shuffled[randomIndex];
    shuffled[randomIndex] = current;
  }

  return shuffled;
}

function getBoxSnapshot(element: Element): BoxSnapshot {
  // Congela as dimensões atuais do elemento para a animação não depender do reflow seguinte.
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}
