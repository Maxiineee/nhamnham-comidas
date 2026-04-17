'use client'
import { useState } from "react";
import ButtonIcon from "./button-icon";
import { IconStar, IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";

const iconClasses = {
    default: "size-7 sm:size-8 text-background",
    active: "size-7 sm:size-8 text-primary"
}

function RenderStars({ avgRating, liked }: { avgRating: number, liked?: boolean }) {
    if (avgRating === 0) return (
        <IconStar className={iconClasses.default} />
    )

    const fullStars = Math.floor(avgRating);
    const hasHalfStar = avgRating - fullStars >= 0.5;

    return (
        <>
            {Array(fullStars).fill(0).map((_, index) => (
                <IconStarFilled className={liked ? iconClasses.active : iconClasses.default} key={index} />
            ))}
            {hasHalfStar && <IconStarHalfFilled className={liked ? iconClasses.active : iconClasses.default} />}
        </>
    )
}

export default function ButtonIconReview({ id, className, avgRating, liked, variant = "default" }: { id: string, className?: string, avgRating: number, liked: boolean, variant?: "default" | "short" }) {
    function handleReview(e: any) {
        e.stopPropagation()
        setIsLiked(!isLiked)
        //Todo
    }

    const [isLiked, setIsLiked] = useState(liked)
    return (
        <ButtonIcon className={className} onClick={handleReview}>
            {variant == "default" ? (
                <RenderStars avgRating={avgRating} liked={isLiked} />
            ) : (
                <div className="flex items-center gap-2">
                    <IconStarFilled className={isLiked ? iconClasses.active : iconClasses.default} />
                    <p className="text-base font-bold text-background">{avgRating}</p>
                </div>
            )}
        </ButtonIcon>
    )
}