import { cn } from "@/lib/utils";

type GameStatusProps = {
  concluiu: boolean;
};

export function GameStatus({ concluiu }: GameStatusProps) {
  return (
    <section
      className={cn(
        "rounded-[1.75rem] border p-4 transition-all sm:rounded-3xl sm:p-5",
        concluiu
          ? "border-emerald-200 bg-emerald-50 text-emerald-950"
          : "border-slate-200 bg-white/80 text-slate-700"
      )}
    >
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] sm:text-sm sm:tracking-[0.2em]">
        Status
      </p>
      <p className="mt-2 text-base font-semibold sm:text-lg">
        {concluiu
          ? "Perfeito. Todos os pares foram associados."
          : "Continue arrastando as palavras para completar o quadro."}
      </p>
    </section>
  );
}
