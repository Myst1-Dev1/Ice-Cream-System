/* eslint-disable @typescript-eslint/no-explicit-any */
'use server';

import { FormResult } from "@/@types/FormResult";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function createSale(_: FormResult, formData: FormData): Promise<FormResult> {
    const category = formData.get("category")?.toString();
    const flavor = formData.get("flavor")?.toString();
    const type = formData.get("type")?.toString();

    const priceRaw = formData.get("price");
    const amountRaw = formData.get("amount");

    const priceFloat = priceRaw
    ? parseFloat(String(priceRaw).replace(",", "."))
    : null;

    const cupSize = formData.get("cupSize")?.toString();
    const typeOfPot = formData.get("typeOfPot")?.toString();

    if (!category || !flavor || !priceRaw || !type)
        return { success: false, message: "Campos obrigatórios!" };

    let price = Number(priceFloat);
    const amount = amountRaw ? Number(amountRaw) : undefined;

    if (amount && !isNaN(amount)) {
        price = price * amount;
    }

    let finalCategory = category;

    if (category === "Copo" && cupSize) {
        finalCategory = `Copo de ${cupSize}`;
    }

    if (category === "Pote" && typeOfPot) {
        finalCategory = `Pote de ${typeOfPot}`;
    }

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    const payload: any = {
        category: finalCategory,
        flavor,
        price,
        type
    };

    if (amount !== undefined) {
        payload.amount = amount;
    }

    try {
        const res = await fetch(process.env.API_URL + "sales", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        const data = await res.json();
        console.log(data);

        revalidatePath('/home');
        revalidateTag("sales", "max");

        return { success: true, message: "Venda cadastrada!" };
    } catch (error) {
        console.log(error);
        return { success: false, message: "Erro ao cadastrar venda" };
    }
}