'use client'

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { IconMail, IconLockPassword, IconBrandGoogle, IconUser } from '@tabler/icons-react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { signup, authenticateState } from "@/lib/actions"
import ButtonLink from "../button-link";

export default function FormRegistrar() {
    const initialState: authenticateState = { message: null, errors: {} };
    const [state, formAction, isPending] = useActionState(signup, initialState)
    
    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")
    
    return (
        <form action={formAction}>
            <FieldGroup className="flex flex-col gap-4">
                <Field>
                    <FieldLabel htmlFor="usernameInput" className="text-foreground">Nome de usuário</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="usernameInput" name="usernameInput" type="text" placeholder="Crie seu nome de usuário" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <InputGroupAddon align="inline-start">
                            <IconUser className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                    {
                        state.errors?.name && (<div className="text-red-500 text-sm">
                            {state.errors.name.map((error, idx) => (
                                <p key={idx}>{error}</p>
                            ))}
                        </div>
                        )}
                </Field>
                <Field>
                    <FieldLabel htmlFor="emailInput" className="text-foreground">E-mail</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="emailInput" name="emailInput"  placeholder="email@exemplo.com" value={email} onChange={(e) => setEmail(e.target.value)} />
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
                        <InputGroupInput id="passwordInput" name="passwordInput" type="password" placeholder="Mínimo de 8 dígitos" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                <Field>
                    <FieldLabel htmlFor="passwordConfirmInput" className="text-foreground">Confirmar senha</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="passwordConfirmInput" name="passwordConfirmInput" type="password" placeholder="Confirme sua senha" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        <InputGroupAddon align="inline-start">
                            <IconLockPassword className="text-muted-foreground" />
                        </InputGroupAddon>
                    </InputGroup>
                    {
                        state.errors?.passwordConfirm && (
                            <div className="text-red-500 text-sm">
                                {state.errors.passwordConfirm.map((error, idx) => (
                                    <p key={idx}>{error}</p>
                                ))}
                            </div>
                        )
                    }
                </Field>
                {state.message && <div className="text-red-500 text-sm">{state.message}</div>}
                <div className="w-full text-end">
                    <Link href='#' className="text-foreground">Esqueceu a senha? <span className="text-primary">Clique aqui</span></Link>
                </div>

                <Button className="hover:cursor-pointer" type="submit" disabled={isPending}>Criar conta</Button>
                <Button variant="outline" className="hover:cursor-pointer">
                    <IconBrandGoogle data-icon="inline-start" />Entrar com Google
                </Button>
                <div className="w-full text-center">
                    <Link href='/entrar' className="text-foreground">Já tem uma conta? <span className="text-primary">Faça login!</span></Link>
                </div>
                <ButtonLink href="/" variant="outline" className="border-primary hover:cursor-pointer">Continuar sem conta</ButtonLink>
            </FieldGroup>
        </form>
    );
}