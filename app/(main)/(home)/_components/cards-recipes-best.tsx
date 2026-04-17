import { getBest } from "@/lib/data-crud";
import CardRecipe from "@/components/card-recipe";
import { cn } from "@/lib/utils";

function getCardRecipeVisibility(index: number) {
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

export default async function CardsRecipesBest({ currentCategory }: { currentCategory?: string }) {
    const category = currentCategory || undefined;
    const data = await getBest(category);
    return (
        data.map((item, index) => (
            <CardRecipe key={index} id={item.id} title={item.title} imgUrl={item.imgUrl} categories={item.categories} liked={item.liked} saved={item.saved} avgRating={item.avgRating} author={item.author} className={cn("w-full max-w-lg max-h-96 aspect-4/3", getCardRecipeVisibility(index))}  />
        ))
    )

}
