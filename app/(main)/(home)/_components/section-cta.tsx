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
                    <h2 className="text-xl font-bold text-foreground">Quer salvar suas receitas favoritas em qualquer dispositivo? Crie uma conta!</h2>
                    <p className="text-sm text-muted-foreground hidden sm:block line-clamp-3">(Não se preocupe, você ainda pode navegar sem criar uma conta)</p>
                </div>
                <div className="flex flex-col text-center flex-1 gap-3">
                    <ButtonLink href="/registrar" className="sm:flex-1" >Registrar</ButtonLink>
                    <ButtonLink href="/entrar" className="flex-1 hidden sm:flex" variant="outline">Entrar</ButtonLink>
                </div>
            </CardContent>
        </Card>
    )
}