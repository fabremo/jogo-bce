import * as React from "react";
import { Dialog } from "radix-ui";

import { cn } from "@/lib/utils";

function DialogRoot({
  ...props
}: React.ComponentProps<typeof Dialog.Root>) {
  return <Dialog.Root data-slot="dialog" {...props} />;
}

function DialogPortal({
  ...props
}: React.ComponentProps<typeof Dialog.Portal>) {
  return <Dialog.Portal data-slot="dialog-portal" {...props} />;
}

function DialogOverlay({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Overlay>) {
  return (
    <Dialog.Overlay
      data-slot="dialog-overlay"
      className={cn(
        "fixed inset-0 z-50 bg-slate-950/55 backdrop-blur-sm",
        className
      )}
      {...props}
    />
  );
}

function DialogContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Dialog.Content>) {
  return (
    <DialogPortal>
      <DialogOverlay />
      <Dialog.Content
        data-slot="dialog-content"
        className={cn(
          "fixed left-1/2 top-1/2 z-50 grid w-[calc(100%-1rem)] max-w-lg -translate-x-1/2 -translate-y-1/2 gap-4 rounded-[1.75rem] border border-white/60 bg-white p-6 shadow-[0_24px_80px_rgba(15,23,42,0.22)] outline-none sm:w-[calc(100%-2rem)] sm:rounded-3xl sm:p-8",
          className
        )}
        {...props}
      >
        {children}
      </Dialog.Content>
    </DialogPortal>
  );
}

function DialogHeader({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-header"
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
      {...props}
    />
  );
}

function DialogFooter({
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      data-slot="dialog-footer"
      className={cn(
        "flex flex-col-reverse items-center justify-center gap-3 sm:flex-row sm:justify-center",
        className
      )}
      {...props}
    />
  );
}

function DialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Title>) {
  return (
    <Dialog.Title
      data-slot="dialog-title"
      className={cn("text-2xl font-black tracking-tight text-slate-950 sm:text-3xl", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof Dialog.Description>) {
  return (
    <Dialog.Description
      data-slot="dialog-description"
      className={cn("text-sm leading-6 text-slate-600 sm:text-base sm:leading-7", className)}
      {...props}
    />
  );
}

function DialogClose({
  ...props
}: React.ComponentProps<typeof Dialog.Close>) {
  return <Dialog.Close data-slot="dialog-close" {...props} />;
}

export {
  DialogRoot as Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
};
