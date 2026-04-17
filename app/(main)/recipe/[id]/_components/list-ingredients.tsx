'use client'

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { FieldGroup, Field, FieldLabel } from "@/components/ui/field";
import { RecipeIngredientData } from "@/lib/data-crud";
import { IconShoppingBag } from "@tabler/icons-react";
import { useState } from "react";
import { addToShoppingList } from "@/lib/data-crud";

export default function ListIngredients({ ingredients }: { ingredients: RecipeIngredientData[] }) {
    const [checkedIngredients, setCheckedIngredients] = useState<number[]>([]);
    function handleAddToShoppingList(ingredientIndexes: number[]) {
        addToShoppingList(ingredientIndexes.map((index) => ingredients[index]))
    }

    return (
        <div className="flex flex-col gap-3">
            <div className="flex justify-between">
                <h2 className="text-base font-bold text-foreground">Ingredients</h2>
                <p className="text-sm text-muted-foreground">Total: {checkedIngredients.length ?? 0} / {ingredients.length ?? 0}</p>
            </div>
            <FieldGroup className="gap-3">
                {ingredients.map((ingredient) => (
                    <Field orientation="horizontal" key={ingredient.id + ingredient.index}>
                        <Checkbox
                            id={ingredient.id + ingredient.index}
                            name={ingredient.id + ingredient.index}
                            checked={checkedIngredients.includes(ingredient.index)}
                            onCheckedChange={(checked) => {
                                if (checked) {
                                    setCheckedIngredients([...checkedIngredients, ingredient.index]);
                                } else {
                                    setCheckedIngredients(checkedIngredients.filter((i) => i !== ingredient.index));
                                }
                            }}
                        />
                        <FieldLabel
                            htmlFor={ingredient.id + ingredient.index}
                            className="text-foreground text-base text-wrap"
                        >
                            {ingredient.quantity} {ingredient.unit} - {ingredient.name}
                        </FieldLabel>
                    </Field>
                ))}
            </FieldGroup>
            <Button variant="outline" className="hover:cursor-pointer" onClick={() => { handleAddToShoppingList(checkedIngredients) }}>
                <IconShoppingBag className="size-5 stroke-2" />Add to Shopping List
            </Button>
        </div>
    )
}