'use client'
import { cn } from "@/lib/utils";
import Link from "next/link";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { useSidebar } from "@/components/ui/sidebar";
import ButtonIcon from "@/components/button-icon";
import ButtonIconReview from "@/components/button-icon-review";
import ButtonIconSave from "@/components/button-icon-save";
import { IconFlagFilled, IconPencilFilled } from "@tabler/icons-react";

const iconClasses = {
    default: "size-7 sm:size-8 text-background",
    active: "size-7 sm:size-8 text-primary"
}

function CardActions({ id, avgRating, saved, liked }: { id: string, liked: boolean, saved: boolean, avgRating: number }) {
    return (
        <div className="flex justify-between items-center w-full">
            <ButtonIconReview id={id} avgRating={avgRating} liked={liked} className="p-2 drop-shadow-lg" />
            <ButtonIconSave id={id} saved={saved} className="p-2 drop-shadow-lg" />
        </div>
    )
}

function ButtonReport({ id }: { id: string }) {
    return (
        <ButtonIcon className="p-2 drop-shadow-lg" onClick={() => { console.log("Test: Report recipe with id: ", id) }}>
            <IconFlagFilled className={iconClasses.default} />
        </ButtonIcon>
    )
}

function ButtonEdit({ id }: { id: string }) {
    return (
        <Link href={`#`} className="cursor-default">
            <ButtonIcon className="p-2">
                <IconPencilFilled className={iconClasses.default} />
            </ButtonIcon>
        </Link>
    )
}

const cardClasses = {
    sidebarClosed: "md:aspect-4/3",
    sidebarOpen: "md:aspect-3/4",
}

export default function CardRecipeImage({ id, imgUrl, liked, saved, avgRating, className, author }: { id: string, imgUrl: string, liked: boolean, saved: boolean, avgRating: number, className?: string, author?: boolean }) {
    const { open } = useSidebar()
    return (
        <Card className={cn("flex flex-col justify-between p-3 sm:p-4 rounded-none sm:rounded-2xl aspect-square lg:aspect-video drop-shadow-lg", className, open ? cardClasses.sidebarOpen : cardClasses.sidebarClosed)}
            style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: 'cover',
                backgroundPosition: 'center'
            }}
        >
            <CardHeader className="flex justify-end p-0">
                {author ? (
                    <ButtonEdit id={id} />
                ) : (
                    <ButtonReport id={id} />
                )}

            </CardHeader>
            <CardContent className="p-0">
                <div className="flex w-full justify-between">
                    <CardActions id={id} saved={saved} avgRating={avgRating} liked={liked} />
                </div>
            </CardContent>
        </Card>
    )
}