import CardCategory from "@/app/(main)/(home)/_components/card-category"

export default function SectionCardsCategories() {
    return (
        <section className="grid w-full max-w-480 grid-cols-2 gap-2 rounded-xl overflow-hidden sm:flex drop-shadow-lg">
            <CardCategory variant="Main" />
            <CardCategory variant="Desserts" />
            <CardCategory variant="Drinks" />
            <CardCategory variant="Snacks" />
        </section>
    )
}