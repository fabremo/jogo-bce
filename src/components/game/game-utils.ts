import type { BoxSnapshot, Pair, PairId } from "@/components/game/game-data";

export function getDragId(pairId: PairId) {
  return `source-${pairId}`;
}

export function getDropId(pairId: PairId) {
  return `target-${pairId}`;
}

export function getPairIdFromDragId(id: string | number | undefined) {
  if (typeof id !== "string" || !id.startsWith("source-")) {
    return null;
  }

  const value = Number(id.replace("source-", ""));

  return Number.isNaN(value) ? null : value;
}

export function getPairIdFromDropId(id: string | number | undefined) {
  if (typeof id !== "string" || !id.startsWith("target-")) {
    return null;
  }

  const value = Number(id.replace("target-", ""));

  return Number.isNaN(value) ? null : value;
}

export function shufflePairs(items: Pair[]) {
  const shuffled = [...items];

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const current = shuffled[index];

    shuffled[index] = shuffled[randomIndex];
    shuffled[randomIndex] = current;
  }

  return shuffled;
}

export function pickRandomPairs(items: Pair[], size: number) {
  return shufflePairs(items).slice(0, size);
}

export function getBoxSnapshot(element: Element): BoxSnapshot {
  const rect = element.getBoundingClientRect();

  return {
    top: rect.top,
    left: rect.left,
    width: rect.width,
    height: rect.height,
  };
}
