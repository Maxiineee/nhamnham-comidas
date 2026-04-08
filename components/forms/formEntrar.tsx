'use client'

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { IconMail, IconLockPassword, IconBrandGoogle } from '@tabler/icons-react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { authenticateState } from "@/lib/actions"
import ButtonLink from "../button-link";
import { login } from "@/lib/actions";
import { useRouter } from "next/navigation";

export default function FormEntrar() {
    const initialState: authenticateState = { message: null, errors: {} };
    const [state, formAction, isPending] = useActionState(handleLogin, initialState)
    const router = useRouter()

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    async function handleLogin(prevState: authenticateState, formData: FormData): Promise<authenticateState> {
        const data = await login(prevState, formData)
        if (!data.errors && !data.message) {
            router.push("/") // Redirect to home page after successful login
        }
        return data
    }

    return (
        <form action={formAction}>
            <FieldGroup className="flex flex-col gap-4">
                <Field>
                    <FieldLabel htmlFor="emailInput" className="text-foreground">E-mail</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="emailInput" name="emailInput" placeholder="email@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputGroupAddon align="inline-start">
                            <IconMail className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                    {
                        state.errors?.email && (
                            <div className="text-red-500 text-sm">
                                {state.errors.email.map((error, idx) => (
                                    <p key={idx}>{error}</p>
                                ))}
                            </div>
                        )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="passwordInput" className="text-foreground">Senha</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="passwordInput" name="passwordInput" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <InputGroupAddon align="inline-start">
                            <IconLockPassword className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                    {
                        state.errors?.password && (
                            <div className="text-red-500 text-sm">
                                {state.errors.password.map((error, idx) => (
                                    <p key={idx}>{error}</p>
                                ))}
                            </div>
                        )}
                </Field>
                {state.message && <div className="text-red-500 text-sm">{state.message}</div>}
                <div className="w-full text-end">
                    <Link href='#' className="text-foreground">Esqueceu a senha? <span className="text-primary">Clique aqui</span></Link>
                </div>
                <Button className="hover:cursor-pointer" type="submit" disabled={isPending} >Entrar</Button>
                <Button variant="outline" className="hover:cursor-pointer">
                    <IconBrandGoogle data-icon="inline-start" />Entrar com Google
                </Button>
                <div className="w-full text-center">
                    <Link href='/registrar' className="text-foreground">Não tem uma conta? <span className="text-primary">Crie uma!</span></Link>
                </div>
                <ButtonLink href="/" variant="outline" className="border-primary hover:cursor-pointer">Continuar sem conta</ButtonLink>
            </FieldGroup>
        </form >
    );
}