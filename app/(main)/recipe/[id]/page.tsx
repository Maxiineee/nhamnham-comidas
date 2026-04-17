import { getUserId, getRecipeAuthorId } from "@/lib/data-crud";
import { Separator } from "@/components/ui/separator";
import SectionRecipeDetails from "./_components/section-details";
import SectionIngredients from "./_components/section-ingredients";
import SectionSteps from "./_components/section-steps";
import SectionReviews from "./_components/section-reviews";
import ButtonLink from "@/components/button-link";
import { IconPencil } from "@tabler/icons-react";
import SectionTabs from "./_components/section-tabs";


export default async function RecipePage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params
    const userId = await getUserId();
    const authorId = await getRecipeAuthorId(id);
    return (
        <div className="sm:px-6 flex flex-col gap-3 sm:gap-6 pb-6">
            <SectionRecipeDetails recipeId={id} />
            <div className="px-3 sm:px-0 my-3 sm:my-0">
                <Separator />
            </div>
            <div className="hidden ml:grid grid-cols-2 gap-6">
                <SectionIngredients recipeId={id} />
                <SectionSteps recipeId={id} />
            </div>
            {(userId === authorId) && (
                <div className="px-3 sm:px-0 flex w-full">
                    <ButtonLink href={`/recipe/${id}/#`} variant="outline" className="hover:cursor-pointer w-full">
                        <IconPencil className="size-5 stroke-2" />Edit your recipe
                    </ButtonLink>
                </div>
            )}
            <div className="hidden ml:block px-3 sm:px-0">
                <Separator />
            </div>
            <div className="hidden ml:block">
                <SectionReviews recipeId={id} />
            </div>
            <div className="ml:hidden">
                <SectionTabs recipeId={id}
                    tabIngredients={<SectionIngredients recipeId={id} />}
                    tabSteps={<SectionSteps recipeId={id} />}
                    tabReviews={<SectionReviews recipeId={id} />}
                />
            </div>
        </div>
    )
}