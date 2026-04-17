import { getRecipeSteps } from "@/lib/data-crud";
import ListSteps from "@/app/(main)/recipe/[id]/_components/list-steps"

export default async function SectionSteps({ recipeId }: { recipeId: string, className?: string }) {
    const data = await getRecipeSteps(recipeId)
    return (
        <section className="px-2 max-h-92 overflow-y-auto ">
            <ListSteps steps={data} />
        </section>
    )
}