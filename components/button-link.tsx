'use client';

import { cn } from "@/lib/utils";
import Link from "next/link";
import { buttonVariants } from "./ui/button";

type ButtonVariants = "default" | "outline" | "ghost" | "link" | "secondary" | "destructive";

export default function ButtonLink({ href, children, className, variant }: { href: string, children: React.ReactNode, className?: string, variant?: ButtonVariants }) {
    return (
        <Link href={href} className={cn(buttonVariants({ variant, className }))}>{children}</Link>
    )
}