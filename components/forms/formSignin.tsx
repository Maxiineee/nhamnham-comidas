'use client'

import { useActionState, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AuthenticateState, signin, signinSocial } from "@/lib/actions"
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { Button } from "@/components/ui/button";
import ButtonLink from "@/components/button-link";
import { IconMail, IconLockPassword, IconBrandGoogle } from '@tabler/icons-react'

export default function FormSignin() {
    const initialState: AuthenticateState = { message: undefined, errors: {} };
    const [state, formAction, isPending] = useActionState(signin, initialState)

    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [socialSigninError, setSocialSigninError] = useState<{ message?: string }>({})
    const searchParams = useSearchParams()
    const signinError = searchParams.get("error")

    async function handleSocialSignin() {
        const data = await signinSocial()
        if (!data?.message) return
        setSocialSigninError(data)
    }

    return (
        <form action={formAction}>
            <FieldGroup className="flex flex-col gap-4">
                <Field>
                    <FieldLabel htmlFor="emailInput" className="text-foreground">E-mail</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="emailInput" name="emailInput" placeholder="email@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <InputGroupAddon align="inline-start">
                            <IconMail className="text-muted-foreground stroke-2" />
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
                    <FieldLabel htmlFor="passwordInput" className="text-foreground">Password</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="passwordInput" name="passwordInput" type="password" placeholder="********" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <InputGroupAddon align="inline-start">
                            <IconLockPassword className="text-muted-foreground stroke-2" />
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
                {(state.message || socialSigninError.message) && <div className="text-red-500 text-sm">{state.message} {socialSigninError.message}</div>}
                {(signinError === "access_denied") && <div className="text-red-500 text-sm">You have canceled your Google Sign in</div>}
                <div className="w-full text-end">
                    <Link href='#' className="text-foreground">Forgot your password? <span className="text-primary">Click here</span></Link>
                </div>
                <Button className="hover:cursor-pointer" type="submit" disabled={isPending} >Sign in</Button>
                <Button variant="outline" className="hover:cursor-pointer" onClick={handleSocialSignin}>
                    <IconBrandGoogle className="size-5" />Sign in with Google
                </Button>
                <div className="w-full text-center">
                    <Link href='/signup' className="text-foreground">Don't have an account? <span className="text-primary">Sign up!</span></Link>
                </div>
                <ButtonLink href="/" variant="outline" className="border-primary hover:cursor-pointer">Continue without an account</ButtonLink>
            </FieldGroup>
        </form >
    );
}