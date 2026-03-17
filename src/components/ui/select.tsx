import * as React from "react";
import { Check, ChevronDown } from "lucide-react";
import { Select } from "radix-ui";

import { cn } from "@/lib/utils";

function SelectRoot({
  ...props
}: React.ComponentProps<typeof Select.Root>) {
  return <Select.Root data-slot="select" {...props} />;
}

function SelectValue({
  ...props
}: React.ComponentProps<typeof Select.Value>) {
  return <Select.Value data-slot="select-value" {...props} />;
}

function SelectTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.Trigger>) {
  return (
    <Select.Trigger
      data-slot="select-trigger"
      className={cn(
        "inline-flex h-12 w-full items-center justify-between gap-3 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-2 text-left text-sm font-bold tracking-[0.08em] text-emerald-700 shadow-sm outline-none transition hover:bg-emerald-100 focus-visible:border-emerald-300 focus-visible:ring-3 focus-visible:ring-emerald-200 sm:h-14 sm:min-w-80 sm:px-5 sm:text-base sm:tracking-[0.16em]",
        className
      )}
      {...props}
    >
      {children}
      <Select.Icon asChild>
        <ChevronDown className="size-4 shrink-0 text-emerald-700 sm:size-5" />
      </Select.Icon>
    </Select.Trigger>
  );
}

function SelectContent({
  className,
  children,
  position = "popper",
  ...props
}: React.ComponentProps<typeof Select.Content>) {
  return (
    <Select.Portal>
      <Select.Content
        data-slot="select-content"
        position={position}
        className={cn(
          "relative z-50 min-w-[var(--radix-select-trigger-width)] overflow-hidden rounded-2xl border border-emerald-200 bg-white text-slate-900 shadow-[0_18px_40px_rgba(15,23,42,0.14)]",
          position === "popper" &&
            "data-[side=bottom]:translate-y-1 data-[side=left]:-translate-x-1 data-[side=right]:translate-x-1 data-[side=top]:-translate-y-1",
          className
        )}
        {...props}
      >
        <Select.Viewport className="p-1.5">{children}</Select.Viewport>
      </Select.Content>
    </Select.Portal>
  );
}

function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof Select.Item>) {
  return (
    <Select.Item
      data-slot="select-item"
      className={cn(
        "relative flex w-full cursor-default select-none items-center rounded-xl py-2.5 pl-9 pr-3 text-sm font-semibold text-slate-700 outline-none transition focus:bg-emerald-50 focus:text-emerald-800 data-[state=checked]:bg-emerald-50 data-[state=checked]:text-emerald-800 sm:text-base",
        className
      )}
      {...props}
    >
      <span className="absolute left-3 flex size-4 items-center justify-center">
        <Select.ItemIndicator>
          <Check className="size-4 text-emerald-600" />
        </Select.ItemIndicator>
      </span>
      <Select.ItemText>{children}</Select.ItemText>
    </Select.Item>
  );
}

export {
  SelectContent,
  SelectItem,
  SelectRoot as Select,
  SelectTrigger,
  SelectValue,
};
