"use client";

import { Check, RotateCcw, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type CompletionDialogProps = {
  open: boolean;
  acertos: number;
  total: number;
  materialPdfPath: string;
  onOpenChange: (open: boolean) => void;
  onReset: () => void;
};

export function CompletionDialog({
  open,
  acertos,
  total,
  materialPdfPath,
  onOpenChange,
  onReset,
}: CompletionDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[calc(100vh-1.5rem)] overflow-y-auto p-4 sm:max-h-[calc(100vh-4rem)] sm:p-8">
        <DialogClose
          className="absolute right-4 top-4 inline-flex size-10 items-center justify-center rounded-full border border-slate-200 bg-white text-slate-500 transition-colors hover:bg-slate-50 hover:text-slate-900"
          aria-label="Fechar popup"
        >
          <X className="size-4" />
        </DialogClose>
        <DialogHeader>
          <div className="inline-flex w-fit items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-xs font-semibold uppercase tracking-[0.24em] text-emerald-700">
            <Check className="size-3.5" />
            Desbloqueado
          </div>
          <DialogTitle>Parabéns, atividade concluída.</DialogTitle>
          <DialogDescription>
            Você fechou a rodada com {acertos} de {total} acertos. O material em PDF
            está liberado para continuar o estudo.
          </DialogDescription>
        </DialogHeader>

        <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-slate-500 sm:text-xs sm:tracking-[0.18em]">
            Prêmio liberado
          </p>
          <p className="mt-2 text-base font-semibold text-slate-900 sm:text-lg">
            Material complementar em PDF
          </p>
          <p className="mt-1 text-sm leading-6 text-slate-600">
            Clique para abrir o arquivo em uma nova aba.
          </p>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            className="h-11 w-full rounded-2xl border-slate-200 bg-white px-5 sm:w-auto"
            onClick={onReset}
          >
            <RotateCcw className="size-4" />
            Jogar novamente
          </Button>
          <Button asChild className="h-11 w-full rounded-2xl px-5 sm:w-auto">
            <a href={materialPdfPath} target="_blank" rel="noopener noreferrer">
              Abrir material em PDF
            </a>
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
