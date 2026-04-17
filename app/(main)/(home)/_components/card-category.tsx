import MainDish from "@/app/assets/Prato Principal.jpg"
import Cake from "@/app/assets/Bolo.jpg"
import Juice from "@/app/assets/Suco.jpg"
import Pastel from "@/app/assets/Pastel.png"
import Image from "next/image"
import Link from "next/link"

type CardCategoryVariant = "Main" | "Desserts" | "Drinks" | "Snacks"

export default function CardCategory({ variant }: { variant: CardCategoryVariant }) {
    let title, img, path
    // Test values for path
    switch (variant) {
        case "Main":
            title = "Main Dishes"
            img = MainDish
            path = "#"
            break
        case "Desserts":
            title = "Desserts"
            img = Cake
            path = "#"
            break
        case "Drinks":
            title = "Drinks"
            img = Juice
            path = "#"
            break
        case "Snacks":
            title = "Snacks"
            img = Pastel
            path = "#"
            break
    }
    return (
        <article className="relative w-full aspect-4/3 max-h-70">
            <Link href={path}>
                <Image
                    src={img}
                    alt={title}
                    fill
                    className="object-cover brightness-50"
                />
                <div className="absolute w-full h-full flex items-center justify-center">
                    <h2 className="text-xl font-bold text-background text-center">
                        {title}
                    </h2>
                </div>
            </Link>
        </article>
    )
}