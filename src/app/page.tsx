import { GameBoard } from "@/components/game/game-board";
import {
  GAME_MODES,
  MATERIAL_PDF_PATH,
  ROUND_SIZE,
} from "@/components/game/game-data";
import { GameHero } from "@/components/game/game-hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,rgba(255,255,255,0.95),rgba(241,245,249,0.92)_35%,rgba(226,232,240,0.88)_100%)] px-3 py-5 text-foreground sm:px-6 sm:py-8 lg:px-8">
      <main className="mx-auto flex w-full max-w-6xl flex-col gap-8">
        <GameHero />
        <GameBoard
          modes={GAME_MODES}
          roundSize={ROUND_SIZE}
          materialPdfPath={MATERIAL_PDF_PATH}
        />
      </main>
    </div>
  );
}
