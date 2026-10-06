'use server';

import { InventoryContent } from "@/components/InventoryContent/page";
import { isDarkMode } from "@/services/darkMode";
import { getItens } from "@/services/getItens";

export default async function Inventory() {
    const dark = await isDarkMode();

    const itens = await getItens();

    const theme = {
        bg: dark ? 'bg-[#121212] text-white' : 'bg-[#fbfbfb] text-black',
        card: dark ? 'bg-[#1e1e1e]' : 'bg-white shadow-sm',
        input: dark ? 'bg-[#1e1e1e] border-zinc-800' : 'bg-white border-zinc-200'
    };

    return (
        <InventoryContent items={itens} theme={theme} />
    );
}