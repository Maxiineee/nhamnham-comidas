'use client'
import { Button } from "@/components/ui/button"
import { Toggle } from "@/components/ui/toggle"
import { useState, useEffect } from "react";
import { searchRecipesByIngredients } from "@/lib/data-crud";
import { authClient } from "@/lib/auth-client" // import the auth client

const ingredientsList = [{ txt: "Macarrão" },
{ txt: "Ovo" }, { txt: "Alface" },
{ txt: "Arroz" }, { txt: "Pão" }, { txt: "Cenoura" }, { txt: "Batata" },
{ txt: "Tomate" }, { txt: "Leite" }, { txt: "Farinha" },
{ txt: "Cebola" }, { txt: "Mais" }
]

export default function SectionGeladeira() {
  const [ingredientes, setIngredientes] = useState<string[]>([]);

  function handleSelectIngredient(ingredient: string) {
    if (ingredient === "Mais") {
      // teste
      alert("Em breve você poderá adicionar mais ingredientes!")
      return;
    }
    const isSelected = ingredientes.includes(ingredient);
    if (isSelected) {
      const newArray = ingredientes.filter(item => item !== ingredient);
      setIngredientes(newArray);
    } else {
      const newArray = [...ingredientes, ingredient]
      setIngredientes(newArray);
    }
  }

  async function handleSearchRecipesByIngredients(e: React.FormEvent) {
    e.preventDefault();
    if (ingredientes.length === 0) return;
    const results = await searchRecipesByIngredients(ingredientes);
    console.log(results);
  }

  return (
    <section>
      <form className="flex flex-col gap-3 sm:gap-6 sm:items-center" onSubmit={handleSearchRecipesByIngredients}>
        <h2 className="text-2xl font-semibold text-foreground">O que têm na geladeira?</h2>
        <p className="text-sm text-muted-foreground">Descubra pratos deliciosos com os ingredientes que você tem em casa</p>
        <div className="flex flex-wrap gap-2 sm:grid sm:grid-cols-6 w-full">
          {ingredientsList.map((item, index) => (
            <Toggle variant="outline" key={index}
              pressed={ingredientes.includes(item.txt)}
              onPressedChange={() => handleSelectIngredient(item.txt)}>{item.txt}</Toggle>
          ))}
        </div>
        <Button variant="outline" disabled={ingredientes.length === 0} className="w-full" type="submit">Encontrar receitas</Button>
      </form>
    </section>
  )
}