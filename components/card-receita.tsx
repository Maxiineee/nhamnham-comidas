import { IconBookmarkFilled, IconStarFilled } from "@tabler/icons-react";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardHeader } from "./ui/card";
import ResumoPerfil from "./resumo-perfil";
import { cn } from "@/lib/utils";
import Link from "next/link";

const iconClasses = {
    default: "size-8 text-background",
    active: "size-8 text-primary"
}

function BadgesCategorias({ categorias }: { categorias: string[] }) {
    return (
        categorias.map((item, index) => (
            <Badge variant="outline" key={index}>{item}</Badge>
        ))
    )
}

function CardActions({ liked, saved, media }: { liked?: boolean, saved?: boolean, media: number }) {
    return (
        <div className="flex gap-4">
            <div className="flex items-center gap-2">
                <IconStarFilled className={liked ? iconClasses.active : iconClasses.default} />
                <p className="text-base font-bold text-background">{media}</p>
            </div>
            <IconBookmarkFilled className={saved ? iconClasses.active : iconClasses.default} />
        </div>
    )
}

export type CardReceitaData = {
    id: string;
    imgUrl: string;
    media: number;
    titulo: string;
    categorias: string[];
    avaliado: boolean;
    salvo: boolean;
    author: {
        id: string;
        name: string;
        imgUrl: string;
    };
}

export default function CardReceita({ data, className }: { data: CardReceitaData, className?: string }) {
    return (

            <Card className={cn("flex flex-col justify-between p-3 sm:p-4", className)}
                style={{
                    backgroundImage: `url(${data.imgUrl})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center'
                }}
            >
                <CardHeader className="flex gap-2 p-0">
                    <BadgesCategorias categorias={data.categorias} />
                </CardHeader>
                <CardContent className="p-0">
                    <h2 className="w-1/2 text-xl sm:text-2xl font-bold text-background">{data.titulo}</h2>
                    <div className="flex w-full justify-between">
                        <CardActions liked={data.avaliado} saved={data.salvo} media={data.media} />
                        <ResumoPerfil userId={data.author.id} username={data.author.name} imgUrl={data.author.imgUrl} />
                    </div>
                </CardContent>
            </Card>

    )
}