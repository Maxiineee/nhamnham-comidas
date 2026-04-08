import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import prisma from "@/lib/prisma";
import { nextCookies } from 'better-auth/next-js';

export const auth = betterAuth({
    database: prismaAdapter(prisma, {
        provider: "postgresql",
    }),
    baseURL: process.env.BETTER_AUTH_URL!,
    basePath: "/api/auth",
    trustedOrigins: [process.env.BETTER_AUTH_URL!],
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: false,
    },
    experimental: { joins: true },
    socialProviders: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID!,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
        },
    },
    user: {
        additionalFields: {
            bio: {
                type: "string",
                required: false,
                input: true,
            },
            role: {
                type: "string",
                required: true,
                defaultValue: "user",
                input: false,
            },
            isBanned: {
                type: "boolean",
                required: true,
                defaultValue: false,
                input: false,
            }
        }
    },
    plugins: [nextCookies()]
});
