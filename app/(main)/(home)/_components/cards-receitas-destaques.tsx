import { getDestaques } from "@/lib/data-crud";
import CardReceita from "@/components/card-receita";
import { cn } from "@/lib/utils";

function getRecipeCardVisibility(index: number) {
    if (index === 0 || index === 1) {
        return "flex"
    }

    if (index === 2) {
        return "flex sm:hidden xl:flex"
    }

    if (index === 3) {
        return "hidden 2xl:flex"
    }

    return "hidden"
}

export default async function CardsReceitasDestaques({ currentCategory }: { currentCategory?: string }) {
    const categoria = currentCategory || undefined;
    const userId = "123"; // valor de teste
    const receitasDestaques = await getDestaques(categoria);
    return (
        receitasDestaques.map((item, index) => (
            <CardReceita key={index} data={item} className={cn("w-full max-w-lg max-h-96 aspect-4/3", getRecipeCardVisibility(index))} />
        ))
    )

}
