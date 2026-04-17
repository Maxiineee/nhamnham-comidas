import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import ProfileSummary from "./profile-summary";
import { cn } from "@/lib/utils";
import ButtonIconSave from "./button-icon-save";
import ButtonIconReview from "./button-icon-review";
import Link from "next/link";

export function BadgesCategories({ categories, className }: { categories: string[], className?: string }) {
    return (
        categories.map((item, index) => (
            <Badge variant="outline" key={index} className={className}>{item}</Badge>
        ))
    )
}

function CardActions({ id, liked, saved, avgRating }: { id: string, liked: boolean, saved: boolean, avgRating: number }) {
    return (
        <div className="flex items-center">
            <ButtonIconReview id={id} avgRating={avgRating} liked={liked} variant="short" className="pe-2 drop-shadow-lg" />
            <ButtonIconSave id={id} saved={saved} className="ps-3 drop-shadow-lg" />
        </div>
    )
}

export default function CardRecipe({ id, title, imgUrl, categories, liked, saved, avgRating, author, className }: {
    className?: string, id: string, title: string, imgUrl: string, categories: string[], liked: boolean, saved: boolean, avgRating: number,
    author: {
        id: string,
        name: string,
        imgUrl: string,
    } 
}) {

    return (
        <Card className={cn("flex flex-col justify-between p-3 sm:p-4 drop-shadow-lg", className)}
            style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <CardHeader className="flex gap-2 p-0 drop-shadow-lg">
                <BadgesCategories categories={categories} />
            </CardHeader>
            <CardContent className="p-0">
                <h2 className="w-1/2 text-xl sm:text-2xl font-bold text-background drop-shadow-lg">{title}</h2>
                <div className="flex w-full justify-between">
                    <CardActions id={id} liked={liked} saved={saved} avgRating={avgRating} />
                    <ProfileSummary userId={author.id} username={author.name} imgUrl={author.imgUrl} className="text-background flex-row-reverse drop-shadow-lg" />
                </div>
            </CardContent>
            <Link href={`/recipe/${id}`} className="absolute inset-0 mb-15"/>
        </Card>
    )
}