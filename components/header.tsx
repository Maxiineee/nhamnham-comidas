'use client'

import { useRouter, usePathname } from "next/navigation"
import { SidebarTrigger } from "./ui/sidebar"
import { IconShoppingBag } from "@tabler/icons-react"
import InputSearch from "./input-search"
import LogoHorizontal from "./logo-horizontal"
import { cn } from "@/lib/utils"
import ButtonLink from "./button-link"
import { Button } from "./ui/button"
import { signout } from "@/lib/actions"

function HeaderLeftSide() {
    return (
        <div className="flex items-center gap-6">
            <SidebarTrigger />
            <LogoHorizontal />
        </div>)
}

function HeaderRightSide({ session }: { session: any }) {
    const router = useRouter()

    const handleSignout = async () => {
        try {
            await signout()
            router.refresh() // Refresh the page to update the UI after signout
        } catch (error) {
            console.error("Signout failed: ", error)
        }
    }

    return (
        <div className="flex items-center gap-6">
            {/** Check if user is authenticated to conditionally show register buttons */}
            {!session ? (
                <>
                    <ButtonLink href="/signin">Sign in</ButtonLink>
                    <ButtonLink href="/signup" variant="outline">Sign up</ButtonLink>
                </>) : (
                <Button className="w-18" variant="outline" onClick={handleSignout}>Sign out</Button>
            )}
            <IconShoppingBag className="size-8" />
        </div>
    )
}

function HeaderCenter() {
    const pathname = usePathname()
    let search = false;
    let filters = false;
    switch (pathname) {
        case "/":
            search = true;
            filters = true;
            break;
    }
    return (
        <div className="flex flex-1">
            {search && <InputSearch filters={filters} />}
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

