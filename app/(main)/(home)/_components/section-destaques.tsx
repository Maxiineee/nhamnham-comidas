import Link from "next/link"
import TogglesCategorias from "@/components/toggles-categorias"
import CardsReceitasDestaques from "@/app/(main)/(home)/_components/cards-receitas-destaques"

export default function SectionDestaques({ currentCategory }: { currentCategory?: string }) {
    return (
        <section className="flex flex-col sm:items-center gap-3 sm:gap-6">
            <h2 className="text-2xl font-semibold text-foreground">Descubra os destaque do mês</h2>
            <p className="hidden sm:block text-sm text-muted-foreground">Descubra os pratos mais bem avaliados do mês para qualquer ocasião</p>
            <div className="flex w-full gap-3 flex-wrap">
                <TogglesCategorias />
            </div>
            <div className="flex flex-col sm:flex-row w-full gap-3 justify-center">
                <CardsReceitasDestaques currentCategory={currentCategory} />
            </div>
            <div className="flex w-full justify-end">
                <Link href="#" className="text-sm font-medium">Ver mais receitas</Link>
            </div>
        </section>
    )
}