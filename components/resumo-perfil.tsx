import Link from "next/link"
import { Avatar, AvatarImage } from "./ui/avatar"

export default function ResumoPerfil(
    { userId, username, imgUrl, className }: { userId: string, username: string, imgUrl: string, className?: string }
) {

    return (
        <Link className={"flex gap-2 items-center " + className} href={'#'}>
            <p className="sm:text-base font-bold text-background">{username}</p>
            <Avatar>
                <AvatarImage src={imgUrl} />
            </Avatar>
        </Link>
    )
}