'use server';

import { cookies } from "next/headers";

interface SignInResult {
  success: boolean;
  message?: string;
}

export async function Login(_: SignInResult, formData: FormData): Promise<SignInResult> {
    const email = formData.get("email")?.toString();
    const password = formData.get("password")?.toString();

    if (!email || !password) {
        return { success: false, message: "Campos obrigatórios." };
    }

    const cookieStore = await cookies();

    try {
        
        return { success: true, message: 'Login realizado com sucesso' }
    } catch (error) {
        return { success: false, message: 'Login realizado com sucesso' }
    }
}