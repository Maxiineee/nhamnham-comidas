import { Toggle } from "@/components/ui/toggle"

const ingredientsList = [{ txt: "Macarrão" },
{ txt: "Ovo" }, { txt: "Alface" },
{ txt: "Arroz" }, { txt: "Pão" }, { txt: "Cenoura" }, { txt: "Batata" },
{ txt: "Tomate" }, { txt: "Leite" }, { txt: "Farinha" },
{ txt: "Cebola" }, { txt: "Mais", value: "more" },
]

function TogglesGeladeira() {
  return (
    ingredientsList.map((item, index) => (
      <Toggle variant="outline" key={index}>{item.txt}</Toggle>
    ))
  )
}

export default function SectionGeladeira() {
    return (
        <section className="flex flex-col gap-3 sm:gap-6 sm:items-center">
            <h2 className="text-2xl font-semibold text-foreground">O que têm na geladeira?</h2>
            <p className="text-sm text-muted-foreground">Descubra pratos deliciosos com os ingredientes que você tem em casa</p>
            <div className="flex flex-wrap gap-2 sm:grid sm:grid-cols-6 w-full">
                <TogglesGeladeira />
            </div>
        </section>
    )
}