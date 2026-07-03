import { cn } from "@/lib/utils";
import * as React from "react";

function Textarea({
  className,
  ...props
}: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "placeholder:text-gray-400 border-gray-200 focus:border-green-500 focus:ring-green-500/20 min-h-[120px] w-full rounded-lg border bg-white px-4 py-2 text-base shadow-sm transition-[color,box-shadow] outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Textarea };
