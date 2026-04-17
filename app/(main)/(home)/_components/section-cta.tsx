import { Card, CardContent } from "@/components/ui/card";
import Logo from "@/components/logo";
import LogoHorizontal from "@/components/logo-horizontal";
import ButtonLink from "@/components/button-link";

export default function SectionCTA({ className }: { className?: string }) {
    return (
        <Card className={className}>
            <CardContent className="grid sm:grid-cols-3 gap-6">
                <div className="flex items-center justify-center">
                    <Logo className="md:hidden size-fit" />
                    <LogoHorizontal size="xl" className="hidden md:block size-fit" />
                </div>
                <div className="flex flex-col gap-3 text-center justify-center flex-1 sm:p-3">
                    <h2 className="text-xl font-bold text-foreground">Want to save your recipes in any device?. Create an account!</h2>
                    <p className="text-sm text-muted-foreground hidden sm:block line-clamp-3">Dont worry, you can still browse without an account</p>
                </div>
                <div className="flex flex-col text-center flex-1 gap-3">
                    <ButtonLink href="/signup" className="sm:flex-1" >Sign up</ButtonLink>
                    <ButtonLink href="/signin" className="flex-1 hidden sm:flex" variant="outline">Sign in</ButtonLink>
                </div>
            </CardContent>
        </Card>
    )
}