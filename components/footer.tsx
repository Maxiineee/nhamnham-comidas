'use client'

import { cn } from "@/lib/utils";
import { navItems } from "@/lib/nav-items";
import { IconPlus } from "@tabler/icons-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

function IconAddRecipe({ className }: { className?: string }) {
    return (
        <div className="relative -top-6 mx-auto rounded-full border-2 border-primary bg-background">
            <IconPlus className={cn("stroke-1", className)} />
        </div>
    )
}

export default function Footer({ className }: { className: string }) {
    const currentPath = usePathname()

    return (
        <footer className={cn("fixed bottom-0 left-0 grid w-full grid-cols-5 place-items-center overflow-visible bg-background h-18 drop-shadow-lg", className)}>
            {navItems.map((item) => {
                const isActive = item.isActive(currentPath)

                if (item.href === "/create") {
                    return (
                        <Link key={item.href} href={item.href} aria-label={item.label}>
                            <IconAddRecipe className={cn("size-16", isActive && "text-primary stroke-2")} />
                        </Link>
                    )
                }

                return (
                    <Link key={item.href} href={item.href} aria-label={item.label}>
                        <item.icon className={cn("size-8", isActive && "text-primary stroke-2")} />
                    </Link>
                )
            })}
        </footer >
    )
}