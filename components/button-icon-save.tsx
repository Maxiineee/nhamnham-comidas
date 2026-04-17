'use client'
import { IconBookmarkFilled } from "@tabler/icons-react";
import ButtonIcon from "./button-icon";
import { useState } from "react";

const iconClasses = {
    default: "size-7 sm:size-8 text-background",
    active: "size-7 sm:size-8 text-primary"
}

export default function ButtonIconSave({ id, saved, className }: { id: string, saved: boolean, className?: string }) {
    const [isSaved, setIsSaved] = useState(saved)
    function handleSave(e: any) {
        e.stopPropagation()
        setIsSaved(!isSaved)
        // todo: logic to save recipe
    }

    return (
        <ButtonIcon className={className} onClick={handleSave}>
            <IconBookmarkFilled className={isSaved ? iconClasses.active : iconClasses.default} />
        </ButtonIcon>
    )
}