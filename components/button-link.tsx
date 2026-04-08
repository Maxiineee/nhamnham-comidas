'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type buttonVariants = "default" | "outline" | "ghost" | "link" | "secondary" | "destructive";

export default function ButtonLink({ href, children, className, variant }: { href: string, children: React.ReactNode, className?: string, variant?: buttonVariants }) {
    return (
        <Link href={href} className={cn(buttonVariants({ variant, className }))}>{children}</Link>
    )
}