/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { FormResult } from "@/@types/FormResult";
import { revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function createSale(_: FormResult, formData: FormData): Promise<FormResult> {
    const category = formData.get("category")?.toString();
    const flavor = formData.get("flavor")?.toString();

    const priceRaw = formData.get("price");
    const price = priceRaw ? Number(priceRaw) : undefined;

    const type = formData.get("type")?.toString();

    const amountRaw = formData.get("amount");
    const amount = amountRaw ? Number(amountRaw) : undefined;

    if(!category || !flavor || !priceRaw || !type) return { success: false, message:'Campos obrigatórios!' };

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const payload: any = { category, flavor, price, type };

    if (amount !== undefined) {
        payload.amount = amount;
    }

    try {
        const res = await fetch(process.env.API_URL + "sales", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(payload)
        });

        const data = await res.json();
        console.log(data);

        revalidateTag("sales");

        return { success: true, message: "Venda cadastrada!" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Erro ao cadastrar venda" };
    }
}