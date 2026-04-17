import Link from "next/link"
import TogglesCategory from "@/app/(main)/(home)/_components/toggles-categories"
import CardsRecipesBest from "@/app/(main)/(home)/_components/cards-recipes-best"

export default function SectionDestaques({ currentCategory }: { currentCategory?: string }) {
    return (
        <section className="flex flex-col sm:items-center gap-3 sm:gap-6">
            <h2 className="text-2xl font-semibold text-foreground">Discover the month's best</h2>
            <p className="hidden sm:block text-sm text-muted-foreground">Discover the best rated dishes of the month for any occasion</p>
            <div className="flex w-full gap-3 flex-wrap">
                <TogglesCategory />
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-3 justify-center">
                <CardsRecipesBest currentCategory={currentCategory} />
            </div>
            <div className="flex w-full justify-end">
                <Link href="#" className="text-sm font-medium">Find more recipes</Link>
            </div>
        </section>
    )
}