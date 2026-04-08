import PratoPrincipal from "@/app/assets/Prato Principal.jpg"
import Bolo from "@/app/assets/Bolo.jpg"
import Suco from "@/app/assets/Suco.jpg"
import Pastel from "@/app/assets/Pastel.png"
import Image from "next/image"
import Link from "next/link"

type CardCategoriaVariant = "Principais" | "Sobremesas" | "Bebidas" | "Lanches"

export default function CardCategoria({ variant }: { variant: CardCategoriaVariant }) {
    let titulo, img, path
    // Paths com valores de teste
    switch (variant) {
        case "Principais":
            titulo = "Pratos Principais"
            img = PratoPrincipal
            path = "#"
            break
        case "Sobremesas":
            titulo = "Sobremesas e Confeitarias"
            img = Bolo
            path = "#"
            break
        case "Bebidas":
            titulo = "Bebidas"
            img = Suco
            path = "#"
            break
        case "Lanches":
            titulo = "Lanches"
            img = Pastel
            path = "#"
            break
    }
    return (
        <article className="relative w-full aspect-4/3 max-h-70">
            <Link href={path}>
                <Image
                    src={img}
                    alt={titulo}
                    fill
                    className="object-cover brightness-50"
                />
                <div className="absolute w-full h-full flex items-center justify-center">
                    <h2 className="text-xl font-bold text-background text-center">
                        {titulo}
                    </h2>
                </div>
            </Link>
        </article>
    )
}