'use server';

import { FormResult } from "@/@types/FormResult";
import { revalidatePath, revalidateTag } from "next/cache";
import { cookies } from "next/headers";

export async function addItemOnInventory(_: FormResult, formData: FormData): Promise<FormResult> {
    const category = formData.get("category")?.toString();
    const flavor = formData.get("flavor")?.toString() || "";

    const amountRaw = formData.get("amount");

    const amount = amountRaw ? Number(amountRaw) : undefined;

    const payload = {
        category,
        flavor,
        amount,
    };

    const cookieStore = await cookies();
    const token = cookieStore.get("token")?.value;

    try {

        const res = await fetch(process.env.API_URL + "inventory/add", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
            },
            body: JSON.stringify(payload),
        });

        if (!res.ok) {
            console.log(res);
            return { success: false, message: "Erro ao cadastrar item" };
        }

        const data = await res.json();
        console.log(data);

        revalidatePath('/inventory');
        revalidateTag("inventory", "max");

        return { success: true, message: "Item cadastrado!" };

        return { success: true, message: "Item adicionado com sucesso!" };
    } catch (error) {
        return { success: false, message: `Erro ao adicionar item! ${error instanceof Error ? error.message : "Erro desconhecido"}` };
    }
}