'use server';

import { FormResult } from "@/@types/FormResult";
import { cookies } from "next/headers";

export async function Login(_: FormResult, formData: FormData): Promise<FormResult> {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return { success: false, message: "Campos obrigatórios." };
    }

    try {
        const res = await fetch(process.env.API_URL + 'auth/login', {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password })
        });

        if (!res.ok) {
            return { success: false, message: "Credenciais inválidas." };
        }

        const data = await res.json();
        const token = data.token;

        if (!token) {
            return { success: false, message: "Token não recebido." };
        }

        const cookieStore = await cookies();
        cookieStore.set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "strict",
            path: "/",
            maxAge: 60 * 60 * 24 // 1 dia
        });

        return { success: true, message: "Login realizado com sucesso" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Erro ao conectar com o servidor" };
    }
}