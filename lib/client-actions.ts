'use client'

import { authClient } from "@/lib/auth-client"

export async function logout() {
    try {
        await authClient.signOut();
    }
    catch (error) {
        console.log("Error during logout: ", error);
        throw new Error("Ocorreu um erro ao sair da conta. Por favor, tente novamente.")
    }
}
