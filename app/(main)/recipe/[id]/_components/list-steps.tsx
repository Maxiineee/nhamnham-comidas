'use client'
import ButtonSteps from "@/app/(main)/recipe/[id]/_components/button-steps";
import { RecipeStepData } from "@/lib/data-crud";
import { IconArrowDownCircle } from "@tabler/icons-react";
import Image from "next/image";
import { useState } from "react";

export default function ListSteps({ steps }: { steps: RecipeStepData[] }) {
    const [checkedButtons, setCheckedButtons] = useState<string[]>([])
    function handlePress(pressed: boolean, stepId: string) {
        if (pressed) {
            const newArray = [...checkedButtons, stepId]
            setCheckedButtons(newArray);
        } else {
            const newArray = checkedButtons.filter(item => item !== stepId);
            setCheckedButtons(newArray);
        }
    }

    return (
        <div className="flex flex-col size-full gap-3">
            <div className="flex justify-between">
                <h2 className="text-base font-bold text-foreground">Steps</h2>
                <p className="text-sm text-muted-foreground">Total: {checkedButtons.length ?? 0} / {steps.length ?? 0}</p>
            </div>

            {steps.map((step) => (
                <div key={step.id} className="flex w-full flex-col gap-6">
                    <div className="flex gap-1 w-full" >
                        <div className="flex-1">
                            <div className="flex float-left gap-3 mr-3 mb-2">
                                <div className="flex rounded-full border-primary border-2 size-14 place-content-center place-items-center shrink-0">
                                    <h3 className="text-2xl font-bold text-primary">{step.index + 1}</h3>
                                </div>
                                {step.imgUrl && (
                                    <div className={"aspect-square h-40 lg:h-60 relative rounded-2xl overflow-hidden drop-shadow-lg"}>
                                        <Image src={step.imgUrl} alt="Step image" fill className="object-cover" />
                                    </div>
                                )}
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-medium text-foreground">{step.description}</p>
                            </div>
                        </div>
                        <div>
                            <ButtonSteps pressed={checkedButtons.includes(step.id)} onPressedChange={(pressed: boolean) => handlePress(pressed, step.id)} />
                        </div>
                    </div>
                    {(step.index !== steps.length - 1) && (
                        <div className="place-items-center">
                            <IconArrowDownCircle className="size-16 text-muted-foreground" />
                        </div>
                    )}
                </div>
            ))}
        </div>
    )
}