'use client'
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { useState } from "react";
import { searchRecipesByIngredients } from "@/lib/data-crud";

const ingredientsList = [{ txt: "Pasta" },
{ txt: "Egg" }, { txt: "Lettuce" },
{ txt: "Rice" }, { txt: "Bread" }, { txt: "Carrot" }, { txt: "Potato" },
{ txt: "Tomato" }, { txt: "Milk" }, { txt: "Flour" },
{ txt: "Onion" }, { txt: "More" }
]

export default function SectionFridge() {
  const [ingredients, setIngredients] = useState<string[]>([]);

  function handleSelectIngredient(ingredient: string) {
    if (ingredient === "More") {
      // Test 
      alert("Soon you'll be able to add more ingredients!")
      return;
    }
    const isSelected = ingredients.includes(ingredient);
    if (isSelected) {
      const newArray = ingredients.filter(item => item !== ingredient);
      setIngredients(newArray);
    } else {
      const newArray = [...ingredients, ingredient]
      setIngredients(newArray);
    }
  }

  async function handleSearchRecipesByIngredients(e: React.FormEvent) {
    e.preventDefault();
    if (ingredients.length === 0) return;
    const results = await searchRecipesByIngredients(ingredients);
    console.log(results);
  }

  return (
    <section>
      <form className="flex flex-col gap-3 sm:gap-6 sm:items-center" onSubmit={handleSearchRecipesByIngredients}>
        <h2 className="text-2xl font-semibold text-foreground">What's on your fridge?</h2>
        <p className="text-sm text-muted-foreground">Discover delicious dishes with the ingredients you have at home</p>
        <div className="flex flex-wrap gap-2 sm:grid sm:grid-cols-6 w-full">
          {ingredientsList.map((item, index) => (
            <Toggle variant="outline" key={index}
              pressed={ingredients.includes(item.txt)}
              onPressedChange={() => handleSelectIngredient(item.txt)}>{item.txt}</Toggle>
          ))}
        </div>
        <Button variant="outline" disabled={ingredients.length === 0} className="w-full" type="submit">Find recipes</Button>
      </form>
    </section>
  )
}