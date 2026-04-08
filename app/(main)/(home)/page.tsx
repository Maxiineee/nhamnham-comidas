import { Separator } from "@/components/ui/separator"
import SectionCardsCategorias from "./_components/section-cards-categorias"
import SectionDestaques from "./_components/section-destaques"
import SectionCTA from "./_components/section-cta"
import SectionGeladeira from "./_components/section-geladeira"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const currentCategory = (await searchParams).category;
  const session = await auth.api.getSession({ headers: await headers() })
  return (
    <div className="flex w-full max-w-480 flex-col gap-3 sm:gap-6 mx-auto sm:mb-3">
      <SectionDestaques currentCategory={currentCategory} />
      <Separator />
      {!session &&
        <>
          <SectionCTA />
          <Separator />
        </>
        }
      <SectionGeladeira />
      <Separator />
      <SectionCardsCategorias />
    </div>
  )
}
