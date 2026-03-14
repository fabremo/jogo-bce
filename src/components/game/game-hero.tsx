import { Sparkles } from "lucide-react";

export function GameHero() {
  return (
    <section className="overflow-hidden rounded-[1.75rem] border border-white/70 bg-white/85 p-4 shadow-[0_24px_80px_rgba(15,23,42,0.12)] backdrop-blur sm:rounded-3xl sm:p-8">
      <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
        <div className="max-w-2xl space-y-4">
          <span className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-emerald-700 sm:text-xs sm:tracking-[0.24em]">
            <Sparkles className="size-3.5" />
            Arraste e associe
          </span>
          <div className="space-y-3">
            <h1 className="text-3xl font-black tracking-tight text-slate-900 sm:text-5xl">
              Forme o <span className="text-orange-500">BCE</span> ligando a palavra em
              português ao significado em inglês.
            </h1>
            <p className="max-w-xl text-sm leading-6 text-slate-600 sm:text-lg sm:leading-7">
              Arrastou no lugar certo, pontuou. Quando todos os pares forem encaixados,
              o tabuleiro fecha com pontuação máxima e você libera seu prêmio.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
