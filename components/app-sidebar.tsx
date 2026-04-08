'use client'
import Link from "next/link"
import { usePathname } from "next/navigation"

import { navItems } from "@/lib/nav-items"
import { cn } from "@/lib/utils"
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
} from "./ui/sidebar"

export default function AppSidebar({ className, session }: { className?: string, session: any }) {
    const currentPath = usePathname()

    return (
        <Sidebar className={className}>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Navegacao</SidebarGroupLabel>
                    <SidebarMenu>
                        {navItems.map((item) => {
                            const isActive = item.isActive(currentPath)

                            if (item.label === "Perfil" && !session?.user) {
                                return null
                            }

                            return (
                                <SidebarMenuItem key={item.href}>
                                    <SidebarMenuButton
                                        isActive={isActive}
                                        size="lg"
                                        tooltip={item.label}
                                        className="text-base [&_svg]:!size-8"
                                    >
                                        <Link href={item.href} className="flex gap-3 items-center w-full">
                                            <item.icon
                                                className={cn(isActive && "text-primary stroke-2")}
                                            />
                                            <span className="text-base font-medium">{item.label}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            )
                        })}
                    </SidebarMenu>
                </SidebarGroup>
            </SidebarContent>
        </Sidebar>
    )
}