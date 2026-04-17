import { Toggle } from "@/components/ui/toggle";
import { IconSoup, IconSoupFilled } from "@tabler/icons-react";

export default function ButtonSteps({ pressed, onPressedChange }: { pressed: boolean, onPressedChange: (pressed: boolean) => void }) {
    return (
        <Toggle variant="outline" pressed={pressed} onPressedChange={onPressedChange} className="h-full w-auto p-2">
            {pressed ? (
                <IconSoupFilled className="size-8 lg:size-12 text-primary-foreground" />
            ) : (
                <IconSoup className="size-8 lg:size-12 text-foreground" />
            )}
        </Toggle>
    )
}