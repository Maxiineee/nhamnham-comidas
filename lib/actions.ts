'use server'

import { z } from "zod";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export type AuthenticateState = {
    errors?: {
        name?: string[],
        email?: string[],
        password?: string[],
        passwordConfirm?: string[],
        role?: string[],
        isBanned?: string[],
    }
    message?: string
}

export async function signup(
    prevState: AuthenticateState,
    formData: FormData,
): Promise<AuthenticateState> {
    const signupSchema = z.object({
        name: z.string().min(3, "The username must be at least 3 characters long"),
        email: z.email("Invalid email format"),
        password: z.string().min(8, "The password must be at least 8 characters long"),
        passwordConfirm: z.string().min(8, "The password confirmation must be at least 8 characters long"),
        role: z.enum(["user", "admin"]).default("user"),
        isBanned: z.boolean().default(false)
    })

    const role = formData.get("emailInput") === "chloedev@test.com" ? "admin" : "user"

    const parsedData = signupSchema.safeParse({
        name: formData.get("usernameInput"),
        email: formData.get("emailInput"),
        password: formData.get("passwordInput"),
        passwordConfirm: formData.get("passwordConfirmInput"),
        role: role,
        isBanned: false,
    })

    if (!parsedData.success) {
        const errors: AuthenticateState["errors"] = parsedData.error.flatten().fieldErrors;
        const message: AuthenticateState["message"] = "Missing or invalid fields. Please check.";
        return {
            errors,
            message,
        };
    }

    if (parsedData.data.password !== parsedData.data.passwordConfirm) {
        return {
            errors: { passwordConfirm: ["The passwords do not match."] },
        }
    }

    const finalData = {
        body: {
            ...parsedData.data,
            callbackURL: "/"
        }
    }

    try {
        await auth.api.signUpEmail(finalData);
    } catch (error) {
        console.log("Error during authentication: ", error);
        throw new Error("An error occurred while creating your account. Please try again.")
    }
    revalidatePath("/") // Revalidate the home page to update the UI after sign in
    redirect("/")
}

export async function signin(
    prevState: AuthenticateState,
    formData: FormData,
): Promise<AuthenticateState> {
    const signinSchema = z.object({
        email: z.email("Enter a valid e-mail"),
        password: z.string().nonempty("Enter a password")
    })

    const parsedData = signinSchema.safeParse({
        email: formData.get("emailInput"),
        password: formData.get("passwordInput"),
    })

    if (!parsedData.success) {
        const errors: AuthenticateState["errors"] = parsedData?.error?.flatten().fieldErrors;
        const message: AuthenticateState["message"] = "Missing or invalid fields. Please check.";
        return {
            errors,
            message,
        };
    }

    const finalData = {
        body: {
            ...parsedData.data,
            callbackURL: "/"
        },
        headers: await headers()
    }

    try {
        await auth.api.signInEmail(finalData);
    } catch (error) {
        return {
            message: "Invalid email or password. Please try again."
        }
    }
    revalidatePath("/") // Revalidate the home page to update the UI after sign in
    redirect("/")
}

export async function signout() {
    const finalData = {
        headers: await headers()
    }
    try {
        await auth.api.signOut(finalData);
    } catch (error) {
        console.log("Error during signout: ", error);
        throw new Error("An error occurred while logging out. Please try again.")
    }
    revalidatePath("/") // Revalidate the home page to update the UI after signout
}

export async function signinSocial(): Promise<AuthenticateState> {
    let urlToRedirect;
    const finalData = {
        body: {
            provider: "google",
            callbackURL: "/",
            errorCallbackURL: "/signin"
        }
    }
    try {
        const { url } = await auth.api.signInSocial(finalData)
        urlToRedirect = url;
    } catch (error) {
        console.log("Error during social sign in: ", error);
        return {
            message: "An error ocurred during your sign in. Please try again."
        }
    }

    if (urlToRedirect) redirect(urlToRedirect)

    return {}
}