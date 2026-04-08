import Footer from "@/components/footer";
import Header from "@/components/header";
import HeaderMobile from "@/components/header-mobile";
import { auth } from "@/lib/auth";
import { headers } from "next/headers"

export default async function MainLayout({ children }: { children: React.ReactNode }) {
    const session = await auth.api.getSession({
        headers: await headers() // Pass the request headers to getSession
    })
    return (
        <div className="flex flex-col w-full sm:gap-3">
            <Header className="hidden sm:flex p-6" session={session} />
            <HeaderMobile className="sm:hidden" />
            <div className="px-3 mb-24 sm:mb-0 sm:px-6">
                {children}
            </div>
            <Footer className="sm:hidden" />
        </div>
    )
}