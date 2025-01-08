'use server';

import bcrypt from "bcryptjs";
import { prisma } from "../prisma"

import { signIn, signOut } from "@/auth";
import { revalidatePath } from "next/cache";
import { AuthError } from "next-auth";

const getUserByEmail = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        return user;
    } catch (error) {
        console.log(error);
        return null;
    }
}

export const login = async (provider: string) => {
    await signIn(provider, { redirectTo: "/" });
    revalidatePath("/");
}
export const logout = async () => {
    await signOut({ redirectTo: "/" });
    revalidatePath("/");
}

export const loginWithCreds = async (formData: FormData) => {
    const data = {
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/"
    };

    const existingUser = await getUserByEmail(data.email as string);
    if (!existingUser) {
        throw new Error("User don't exist")
    }
    try {
        await signIn("credentials", data);
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    throw new Error("Invalid Credentials")
                default:
                    throw new Error("Something went wrong");
            }
        }
        throw error;
    }
    revalidatePath("/");
}

export const registerWithCreds = async (formData: FormData) => {
    const data = {
        name: formData.get("name"),
        email: formData.get("email"),
        password: formData.get("password"),
        redirectTo: "/"
    };

    const existingUser = await getUserByEmail(data.email as string);
    if (existingUser) {
        throw new Error("User already exists");
    }
    try {
        await signIn("credentials", data);
    } catch (error: any) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    throw new Error("Invalid Credentials")
                default:
                    throw new Error("Something went wrong");
            }
        }
        throw error;
    }
    revalidatePath("/");
}


export async function registerUtil(name: string, email: string, password: string) {
    console.log("register :", name, email, password)
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        let user = await prisma.user.findUnique({ where: { email } });

        if (user) {
            throw new Error("Email already registered");
        }

        user = await prisma.user.create({
            data: {
                name,
                email,
                password: hashedPassword,
            },
        });
        console.log("Login Success : ", user)
        return user;
    } catch (error: unknown) {
        if (error instanceof Error) {
            throw new Error("Error registering user: " + error.message);
        }
        throw new Error("Unknown error during registration");
    } finally {
        await prisma.$disconnect()
    }
}

export async function loginUtil(email: string, password: string) {
    try {
        const user = await prisma.user.findUnique({ where: { email } });

        if (!user) {
            throw new Error("User not found");
        }

        if (!user.password) {
            throw new Error("Invalid method for login");
        }

        const isValid = await bcrypt.compare(password, user.password);

        if (!isValid) {
            throw new Error("Invalid credentials");
        }

        console.log("Login Success : ", user)
        return user;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error loging in user: " + error.message);
        }
        throw new Error("Unknown error during login");
    } finally {
        await prisma.$disconnect()
    }
}
