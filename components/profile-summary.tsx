import Link from "next/link"
import { Avatar, AvatarImage } from "./ui/avatar"

export default function ProfileSummary(
    { userId, username, imgUrl, className }: { userId: string, username: string, imgUrl: string, className?: string }
) {

    return (
        <Link className={"flex gap-2 items-center " + className} href={'/profile/' + userId}>
            <Avatar>
                <AvatarImage src={imgUrl} />
            </Avatar>
            <p className="sm:text-base font-bold">{username}</p>
        </Link>
    )
}