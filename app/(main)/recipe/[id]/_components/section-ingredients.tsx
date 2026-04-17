import ListIngredients from "@/app/(main)/recipe/[id]/_components/list-ingredients";
import { getRecipeIngredients } from "@/lib/data-crud";

export default async function SectionIngredients({ recipeId }: { recipeId: string, className?: string }) {
    const data = await getRecipeIngredients(recipeId);

    if (!data) {
        return (
            <>//Todo: Not found</>
        )
    }
    return (
        <section className="max-h-92 overflow-y-auto px-2">
            <ListIngredients ingredients={data} />
        </section>
    )
}