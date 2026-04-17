import imgCooking from "@/app/assets/Cozinhando.png";
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { IconChefHat } from "@tabler/icons-react";
import LogoHorizontal from "@/components/logo-horizontal";

export default function LayoutAuth({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex flex-col sm:items-center sm:justify-center min-h-screen w-full sm:p-4 overflow-y-auto">
            <div className="z-0 relative sm:fixed w-full min-h-36 sm:inset-0 overflow-hidden flex items-center justify-center grow">
                <Image src={imgCooking} fill priority alt="Background image of a cooking pan with ingredients" className="object-cover scale-[1.01] brightness-50 sm:blur-sm" />
                <IconChefHat className="z-10 text-background/85 sm:hidden" width={80} height={80} />
            </div>
            <Card className="z-10 w-full sm:max-w-lg drop-shadow-lg">
                <CardHeader className="flex flex-col gap-2">
                    <LogoHorizontal size="lg" />
                    <CardTitle className="text-lg font-bold text-card-foreground">Cook, share and discover flavors</CardTitle>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </div>
    )
}