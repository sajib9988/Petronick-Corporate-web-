import { cn } from "@/lib/utils";
import {ReactNode} from "react"


interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export const Container = ({ children, className }: ContainerProps) => {
  return (
   <div className={cn("max-w-[1400px] mx-auto px-4 sm:px-5 lg:px-6", className)}>
      {children}
    </div>

    );
}