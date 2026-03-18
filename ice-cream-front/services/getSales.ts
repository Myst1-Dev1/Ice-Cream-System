'use server';

import { cookies } from "next/headers";

export async function getSales() {
    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    try {
        const res = await fetch(process.env.API_URL + 'sales', {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            next: { tags: ['sales'] }
        });

        if (!res.ok) {
            console.error("Erro na API:", res.status);
            return [];
        }

        const data = await res.json();

        return data;
    } catch (error) {
        console.log('erro ao pegar os dados de vendas', error);
    }
}