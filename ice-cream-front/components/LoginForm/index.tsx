'use client';

import { useRouter } from "next/navigation";
import { Login } from "../../actions/authActions";
import { useActionState } from "react";
import { Loading } from "../loading";

export function LoginForm() {
    const router = useRouter();

    async function handleLogin(prevState: { success: boolean; message?: string }, formData: FormData) {
        const result = await Login(prevState, formData);

        if (result.success) {
            router.push("/home");
        }

        return result;
    }

    const [formState, formAction, pending] = useActionState(handleLogin, { success: false });
    
    return (
        <>
            <form action={formAction} className="max-w-80">
                <input type="email" placeholder="Email" name="email" className="mb-3 w-full p-3 outline-none border border-gray-300 rounded-md" />
                <input type="password" placeholder="Senha" name="password" className="w-full p-3 outline-none border border-gray-300 rounded-md" />
                {formState.success === false ? <p className="text-center py-3 text-red-700 font-semibold">{formState.message}</p> : ''}
                <button type="submit" className="button mt-5">
                    {pending ? <Loading /> : 'Entrar'}
                </button>
            </form>
        </>
    )
}