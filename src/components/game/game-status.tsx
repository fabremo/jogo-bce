import { cn } from "@/lib/utils";

type GameStatusProps = {
  concluiu: boolean;
};

export function GameStatus({ concluiu }: GameStatusProps) {
  return (
    <section
      className={cn(
        "rounded-3xl border p-5 transition-all",
        concluiu
          ? "border-emerald-200 bg-emerald-50 text-emerald-950"
          : "border-slate-200 bg-white/80 text-slate-700"
      )}
    >
      <p className="text-sm font-semibold uppercase tracking-[0.2em]">Status</p>
      <p className="mt-2 text-lg font-semibold">
        {concluiu
          ? "Perfeito. Todos os pares foram associados."
          : "Continue arrastando as palavras para completar o quadro."}
      </p>
    </section>
  );
}
