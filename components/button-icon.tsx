import { cn } from "@/lib/utils";
import { Button } from "./ui/button";

export default function ButtonIcon({ children, className, onClick }: { children: React.ReactNode; className?: string; onClick?: (e: any) => void }) {
    return (
        <Button variant="ghost" className={cn("p-0 hover:bg-transparent hover:brightness-80 focus:brightness-80 focus-visible:ring-0 border-none", className)} onClick={onClick}>
            {children}
        </Button>
    )
}