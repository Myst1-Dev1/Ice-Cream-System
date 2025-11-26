'use client';

import { Login } from "../../actions/authActions";
import { useActionState } from "react";

export function LoginForm() {
     const [formState, formAction, pending] = useActionState(Login, { success: false });
    
    return (
        <>
            <form action="" className="max-w-80">
                <input type="email" placeholder="Email" className="mb-3 w-full p-3 outline-none border border-gray-300 rounded-md" />
                <input type="password" placeholder="Senha" className="w-full p-3 outline-none border border-gray-300 rounded-md" />
                <button type="submit" className="button mt-5">Entrar</button>
          </form>
        </>
    )
}