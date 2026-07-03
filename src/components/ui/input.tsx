import { cn } from "@/lib/utils";
import * as React from "react";

function Input({
  className,
  type,
  ...props
}: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "placeholder:text-gray-400 border-gray-200 focus:border-green-500 focus:ring-green-500/20 h-11 w-full min-w-0 rounded-lg border bg-white px-4 py-2 text-base shadow-sm transition-[color,box-shadow] outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  );
}

export { Input };
