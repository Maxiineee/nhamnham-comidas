import { Separator } from "@/components/ui/separator"
import SectionCardsCategories from "./_components/section-cards-categories"
import SectionBest from "./_components/section-best"
import SectionCTA from "./_components/section-cta"
import SectionFridge from "./_components/section-fridge"
import { auth } from "@/lib/auth"
import { headers } from "next/headers"

export default async function Page({ searchParams }: { searchParams: Promise<{ category?: string }> }) {
  const currentCategory = (await searchParams).category;
  const session = await auth.api.getSession({ headers: await headers() })
  return (
    <div className="flex w-full max-w-480 flex-col gap-3 sm:gap-6 mx-auto sm:mb-3 sm:px-6 px-3">
      <SectionBest currentCategory={currentCategory} />
      <Separator />
      {!session &&
        <>
          <SectionCTA />
          <Separator />
        </>
      }
      <SectionFridge />
      <Separator />
      <SectionCardsCategories />
    </div>
  )
}
