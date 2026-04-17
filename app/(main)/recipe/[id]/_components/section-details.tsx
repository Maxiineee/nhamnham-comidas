import CardRecipeImage from "./card-recipe-image";
import { getRecipeDetails, getUserId } from "@/lib/data-crud";
import { IconBowl, IconCalendar, IconClock } from "@tabler/icons-react";
import { Suspense } from "react";
import { BadgesCategories } from "@/components/card-recipe";
import { Separator } from "@/components/ui/separator";
import ProfileSummary from "@/components/profile-summary";

export default async function SectionRecipeDetails({ recipeId }: { recipeId: string }) {
    const data = await getRecipeDetails(recipeId);
    const userId = await getUserId()

    if (!data) {
        return (
            <>//Todo: Not found</>
        )
    }

    return (
        <section className="grid sm:grid-cols-2 gap-6">
            <Suspense>
                <CardRecipeImage id={data.id} imgUrl={data.imgUrl} liked={data.liked} saved={data.saved} avgRating={data.avgRating} author={userId === data.author.id} />
            </Suspense>
            <div className="flex flex-col sm:pt-3 gap-3 px-3 sm:px-0">
                <h1 className="text-2xl font-bold text-foreground">{data.title}</h1>
                <div className="flex gap-3 flex-wrap text-sm font-medium text-foreground">
                    <div className="flex items-center gap-1">
                        <IconClock className="size-6 stroke-2" />
                        <p>{data.prepTime} min</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <IconBowl className="size-6 stroke-2" />
                        <p>{data.servings} servings</p>
                    </div>
                    <div className="flex items-center gap-1">
                        <IconCalendar className="size-6 stroke-2" />
                        <p>{data.createdAt.toLocaleDateString()}</p>
                    </div>
                </div>
                <div className="flex gap-2 flex-wrap">
                    <BadgesCategories categories={[...data.categories, ...data.tags]} className="bg-transparent text-foreground p-3 text-sm font-medium" />
                </div>
                <Separator className="my-3" />
                <p className="text-base text-foreground">"{data.description}"</p>
                <ProfileSummary userId={data.author.id} username={data.author.name} imgUrl={data.author.imgUrl} className="text-foreground" />
            </div>
        </section>
    )
}