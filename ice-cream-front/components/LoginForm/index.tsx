'use client';

import { useRouter } from "next/navigation";
import { Login } from "../../actions/authActions";
import { useActionState } from "react";
import { Loading } from "../loading";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

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

    useGSAP(() => {
        const tl = gsap.timeline({defaults: { duration:0.4, stagger:0.5, ease:'sine.inOut' }});

        tl.fromTo('.input', { opacity:0, y:-20 }, { opacity:1, y:0 });
        tl.fromTo('.btn', { opacity:0, x:-20 }, { opacity:1, x:0 });
    }, []);
    
    return (
        <>
            <form action={formAction} className="max-w-80">
                <input type="email" placeholder="Email" name="email" className="input mb-3 w-full p-3 outline-none border border-gray-300 rounded-md" />
                <input type="password" placeholder="Senha" name="password" className="input w-full p-3 outline-none border border-gray-300 rounded-md" />
                {formState.success === false ? <p className="text-center py-3 text-red-700 font-semibold">{formState.message}</p> : ''}
                <button type="submit" className="button btn mt-3">
                    {pending ? <Loading /> : 'Entrar'}
                </button>
            </form>
        </>
    )
}