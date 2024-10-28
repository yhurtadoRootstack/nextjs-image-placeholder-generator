import { cn } from "@/lib/utils";
import { ReactNode } from "react";

type props = {
  children?: ReactNode;
  className?: string;
};

export default function Container({ children, className }: props) {
  return (
    <div
      className={cn("mx-auto min-w-80 max-w-6xl w-full h-full py-2", className)}
    >
      {children}
    </div>
  );
}
