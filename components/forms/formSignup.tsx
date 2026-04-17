'use client'

import { Field, FieldGroup, FieldLabel } from "@/components/ui/field"
import { InputGroup, InputGroupAddon, InputGroupInput } from "@/components/ui/input-group"
import { IconMail, IconLockPassword, IconBrandGoogle, IconUser } from '@tabler/icons-react'
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useActionState, useState } from "react";
import { signup, AuthenticateState, signinSocial } from "@/lib/actions"
import ButtonLink from "../button-link";
import { useSearchParams } from "next/navigation";

export default function FormSignup() {
    const initialState: AuthenticateState = { message: undefined, errors: {} };
    const [state, formAction, isPending] = useActionState(signup, initialState)

    const [username, setUsername] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [passwordConfirm, setPasswordConfirm] = useState("")

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
                    <FieldLabel htmlFor="usernameInput" className="text-foreground">Username</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="usernameInput" name="usernameInput" type="text" placeholder="Create your username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <InputGroupAddon align="inline-start">
                            <IconUser className="text-muted-foreground stroke-2" />
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
                        <InputGroupInput id="passwordInput" name="passwordInput" type="password" placeholder="At least 8 characters long" value={password} onChange={(e) => setPassword(e.target.value)} />
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
                <Field>
                    <FieldLabel htmlFor="passwordConfirmInput" className="text-foreground">Confirm your password</FieldLabel>
                    <InputGroup>
                        <InputGroupInput id="passwordConfirmInput" name="passwordConfirmInput" type="password" placeholder="Confirm your password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} />
                        <InputGroupAddon align="inline-start">
                            <IconLockPassword className="text-muted-foreground stroke-2" />
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
                {(state.message || socialSigninError.message) && <div className="text-red-500 text-sm">{state.message} {socialSigninError.message}</div>}
                {(signinError === "access_denied") && <div className="text-red-500 text-sm">You have canceled your Google Sign in</div>}
                <div className="w-full text-end">
                    <Link href='#' className="text-foreground">Forgot your password? <span className="text-primary">Click here</span></Link>
                </div>

                <Button className="hover:cursor-pointer" type="submit" disabled={isPending}>Create account</Button>
                <Button variant="outline" className="hover:cursor-pointer" onClick={handleSocialSignin}>
                    <IconBrandGoogle className="size-5" />Sign in with Google
                </Button>
                <div className="w-full text-center">
                    <Link href='/Sign in' className="text-foreground">Already have an account? <span className="text-primary">Log in!</span></Link>
                </div>
                <ButtonLink href="/" variant="outline" className="border-primary hover:cursor-pointer">Continue without an account</ButtonLink>
            </FieldGroup>
        </form>
    );
}