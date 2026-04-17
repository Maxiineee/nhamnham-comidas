'use client'
import ButtonIcon from "@/components/button-icon";
import ProfileSummary from "@/components/profile-summary";
import { IconCalendar, IconFlag, IconHeart, IconHeartFilled, IconStar, IconStarFilled, IconStarHalfFilled } from "@tabler/icons-react";
import { useState } from "react";
import { likeReview, unlikeReview } from "@/lib/data-crud"

function RenderStars({ avgRating }: { avgRating: number }) {
    const iconClass = ""
    if (avgRating === 0) return (
        <IconStar className={iconClass} />
    )

    const fullStars = Math.floor(avgRating);
    const hasHalfStar = avgRating - fullStars >= 0.5;

    return (
        <>
            {Array(fullStars).fill(0).map((_, index) => (
                <IconStarFilled className={iconClass} key={index} />
            ))}
            {hasHalfStar && <IconStarHalfFilled className={iconClass} />}
        </>
    )
}

function ButtonReport({ id }: { id: string }) {
    return (
        <ButtonIcon className="drop-shadow-lg h-auto pl-3" onClick={() => { console.log("Test: Report recipe with id: ", id) }}>
            <IconFlag className="size-5 stroke-2 text-muted-foreground" />
        </ButtonIcon>
    )
}

export default function Review({ id, value, comment, likes, liked, createdAt, author }: {
    id: string, value: number, comment?: string, likes: number, liked: boolean, createdAt: Date,
    author: {
        id: string,
        name: string,
        imgUrl: string
    }
}) {
    const [isLiked, setIsLiked] = useState(liked)
    function handleLikeComment() {
        if (!isLiked) {
            likeReview(id)
        } else {
            unlikeReview(id)
        }
        setIsLiked(!isLiked)
    }

    return (
        <div className="flex flex-col gap-2">
            <div className="flex justify-between">
                <ProfileSummary userId={author.id} username={author.name} imgUrl={author.imgUrl} />
                <div className="flex gap-2">
                    <RenderStars avgRating={value} />
                </div>
            </div>
            {comment && (
                <p className="text-sm font-medium text-foreground">{comment}</p>
            )}
            <div className="flex justify-between items-center">
                <div className="flex gap-3 items-center">
                    {comment && (
                        <ButtonIcon className="flex gap-1 items-center h-auto" onClick={handleLikeComment}>
                            {isLiked ? (
                                <IconHeartFilled className="size-5 stroke-2 text-primary" />
                            ) : (
                                <IconHeart className="size-5 stroke-2 text-foreground" />
                            )}
                            <p className="text-sm font-medium text-foreground">
                                {likes}
                            </p>
                        </ButtonIcon>
                    )}
                    <div className="flex gap-1">
                        <IconCalendar className="size-5 stroke-2 text-foreground" />
                        <p className="text-sm font-medium text-foreground">
                            {createdAt.toLocaleDateString()}
                        </p>
                    </div>
                </div>
                <ButtonReport id={id} />
            </div>
        </div>
    )
}