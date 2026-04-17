import { Button } from "@/components/ui/button";
import { getRecipeReviews } from "@/lib/data-crud";
import { IconStar } from "@tabler/icons-react";
import Review from "@/app/(main)/recipe/[id]/_components/review";

export default async function SectionReviews({ recipeId }: { recipeId: string }) {
    const data = await getRecipeReviews(recipeId)

    if (!data) return (
        <></>
    )

    return (
        <section className="flex flex-col gap-6 px-2">
            <div className="flex flex-col gap-2">
                <div className="flex justify-between">
                    <h2 className="text-base font-bold text-foreground">Reviews</h2>
                    <p className="text-sm text-muted-foreground">Total: {data?.length ?? 0}</p>
                </div>
                <p className="text-sm font-medium text-foreground">Leave a review and comment on this recipe!</p>
                <Button className="hover:cursor-pointer">
                    <IconStar className="size-5 stroke-2" />Review
                </Button>
            </div>
            {data.map((item) => (
                <Review id={item.id} value={item.value} comment={item.comment} likes={item.likes} liked={item.liked} createdAt={item.createdAt} author={item.author} key={item.id} />
            ))}
        </section>
    )
}