import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cn } from "../../lib/utils"; // utils.js में cn function बनाना होगा

const buttonVariants = {
  default: "bg-white text-black px-10 flex items-center justify-center py-2 rounded-lg hover:bg-gray-200",
  outline: "border border-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-100",
};

const Button = React.forwardRef(({ className, variant = "default", asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button";
  return (
    <Comp
      ref={ref}
      className={cn(buttonVariants[variant], className)}
      {...props}
    />
  );
});

Button.displayName = "Button";
export { Button };
