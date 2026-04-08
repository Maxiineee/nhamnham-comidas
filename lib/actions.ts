'use server'

import { z } from "zod";
import { auth } from "@/lib/auth"
import { headers } from "next/headers";
import { revalidatePath } from "next/cache";

export type authenticateState = {
    errors?: {
        name?: string[],
        email?: string[],
        password?: string[],
        passwordConfirm?: string[],
        role?: string[],
        isBanned?: string[],
    }
    message?: string | null
}

export async function signup(
    prevState: authenticateState,
    formData: FormData,
): Promise<authenticateState> {
    const signupSchema = z.object({
        name: z.string().min(3, "O nome deve conter pelo menos 3 caracteres"),
        email: z.email("Formato de e-mail inválido"),
        password: z.string().min(8, "A senha deve conter pelo menos 8 caracteres"),
        passwordConfirm: z.string().min(8, "A confirmação de senha deve conter pelo menos 8 caracteres"),
        role: z.enum(["user", "admin"]).default("user"),
        isBanned: z.boolean().default(false)
    })

    const role = formData.get("emailInput") === "chloedev@teste.com" ? "admin" : "user"

    const parsedData = signupSchema.safeParse({
        name: formData.get("usernameInput"),
        email: formData.get("emailInput"),
        password: formData.get("passwordInput"),
        passwordConfirm: formData.get("passwordConfirmInput"),
        role: role,
        isBanned: false,
    })

    if (!parsedData.success) {
        const errors: authenticateState["errors"] = parsedData.error.flatten().fieldErrors;
        const message: authenticateState["message"] = "Campos faltando ou inválidos. Verifique.";
        return {
            errors,
            message,
        };
    }

    if (parsedData.data.password !== parsedData.data.passwordConfirm) {
        return {
            errors: { passwordConfirm: ["As senhas não coincidem."] },
        }
    }

    try {
        await auth.api.signUpEmail({ body: parsedData.data });
    } catch (error) {
        console.log("Error during authentication: ", error);
        throw new Error("Ocorreu um erro ao criar a conta. Por favor, tente novamente.")
    }
    return {}
}

export async function login(
    prevState: authenticateState,
    formData: FormData,
): Promise<authenticateState> {
    const loginSchema = z.object({
        email: z.email("Formato de e-mail inválido"),
        password: z.string()
    })

    const parsedData = loginSchema.safeParse({
        email: formData.get("emailInput"),
        password: formData.get("passwordInput"),
    })

    if (!parsedData.success) {
        const errors: authenticateState["errors"] = parsedData.error.flatten().fieldErrors;
        const message: authenticateState["message"] = "Campos faltando ou inválidos. Verifique.";
        return {
            errors,
            message,
        };
    }

    try {
        const result = await auth.api.signInEmail({ body: parsedData.data, headers: await headers() });
        console.log("🟢 Login response:", JSON.stringify(result, null, 2));
    } catch (error) {
        console.log("🔴 Erro no login:", error);
        return {
            message: "E-mail ou senha incorretos. Por favor, tente novamente."
        }
    }
    revalidatePath("/") // Revalidate the home page to update the UI after login
    return {}
}