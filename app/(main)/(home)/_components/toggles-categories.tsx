'use client'
import { Toggle } from "@/components/ui/toggle"
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { useState } from "react";

const categoryList = [
    { txt: "Breakfast" },
    { txt: "Lunch" },
    { txt: "Dinner" },
    { txt: "Snacks" },
    { txt: "Desserts" }
]

export default function TogglesCategories() {
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string | null>(searchParams.get("category") ?? null);

    const pathname = usePathname();
    const { replace } = useRouter();

    function handleSelectCategory(category: string) {
        const nextCategory = selectedCategory === category ? null : category;
        setSelectedCategory(nextCategory);
        const params = new URLSearchParams(searchParams);
        if (nextCategory) {
            params.set("category", nextCategory);
        } else {
            params.delete("category");
        }
        const paramsString = params.toString();
        replace(`${pathname}?${paramsString}`);
    }

    return (
        categoryList.map((item, index) => (
            <Toggle
                variant="outline"
                className="flex sm:flex-1"
                key={index}
                pressed={selectedCategory === item.txt}
                onPressedChange={() => handleSelectCategory(item.txt)}
            >
                {item.txt}
            </Toggle>
        ))
    )
}