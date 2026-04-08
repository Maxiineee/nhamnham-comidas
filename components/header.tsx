'use client'

import { useRouter } from "next/navigation"
import { SidebarTrigger } from "./ui/sidebar"
import { IconShoppingBag } from "@tabler/icons-react"
import InputPesquisa from "./input-pesquisa"
import LogoHorizontal from "./logo-horizontal"
import { cn } from "@/lib/utils"
import ButtonLink from "./button-link"
import { Button } from "./ui/button"
import { logout } from "@/lib/client-actions"

function HeaderLeftSide() {
    return (
        <div className="flex items-center gap-6">
            <SidebarTrigger />
            <LogoHorizontal />
        </div>)
}

function HeaderRightSide({ session }: { session: any }) {
    const router = useRouter()

    const handleLogout = async () => {
        try {
            await logout()
            router.refresh() // Refresh the page to update the UI after logout
        } catch (error) {
            console.error("Logout failed:", error)
        }
    }

    return (
        <div className="flex items-center gap-6">
            {/** Check if user is authenticated to conditionally show register buttons */}
            {!session ? (
                <>
                    <ButtonLink href="/entrar">Entrar</ButtonLink>
                    <ButtonLink href="/registrar" variant="outline">Registrar</ButtonLink>
                </>) : (
                <Button className="w-18" variant="outline" onClick={handleLogout}>Sair</Button>
            )
            }
            <IconShoppingBag className="size-8" />
        </div>
    )
}

function HeaderCenter() {
    return (
        <div className="flex flex-1">
            <InputPesquisa filters />
        </div>
    )
}

export default function Header({ className, session }: { className?: string; session: any }) {
    return (
        <header className={cn("flex w-full gap-6 items-center", className)}>
            <HeaderLeftSide />
            <HeaderCenter />
            <HeaderRightSide session={session} />
        </header>
    )
}

