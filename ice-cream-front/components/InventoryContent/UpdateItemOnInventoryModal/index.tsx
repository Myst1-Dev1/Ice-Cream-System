import { updateItemOnInventory } from "@/actions/InventoryActions";
import { Loading } from "@/components/loading";
import { Modal } from "@/components/Modal";
import React, { useActionState } from "react";
import { toast } from "react-toastify";


interface UpdateItemOnInventoryModalProps {
    items: {
        id: number;
        flavor: string;
        category: string;
        amount: number;
    }[];
    id: number;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateItemOnInventoryModal({ items, id, isOpen, setIsOpen }: UpdateItemOnInventoryModalProps) {
     const [category, setCategory] = React.useState("");
    
    const formRef = React.useRef<HTMLFormElement>(null);

     async function actionSale(prevState: { success: boolean; message?: string }, formData: FormData) {
            const result = await updateItemOnInventory(prevState, formData, id);
    
            if (result.success) {
                setIsOpen(false);
                setCategory('');
                formRef.current?.reset();
                toast.success(result.message);
            }
            else {
                toast.error(result.message);
            }
    
            return result;
    }
    
    const [formState, formAction, pending] = useActionState(actionSale, { success: false });

    const filterItemData = items.find(item => item.id === id);

    console.log(filterItemData);

    return (
        <Modal isOpenModal={isOpen} setIsOpenModal={setIsOpen}>
            <div>
                <h3 className="text-xl font-bold text-center ">Adicione items ao seu estoque</h3>

                <form ref={formRef} action={formAction} className="mt-6 flex flex-col gap-4">
                    <div className="flex flex-col gap-3">
                        <label htmlFor="category" className="font-semibold">Categoria</label>

                        <select
                            value={category}
                            onChange={(e) => setCategory(e.target.value)}
                            name="category"
                            className="w-full p-3 border border-gray-300 rounded-md outline-none"
                        >
                            <option className="text-gray-600" value="">Selecione a categoria</option>
                            <option className="text-gray-600" value="Picolé Eskimo">Picolé Eskimo</option>
                            <option className="text-gray-600" value="Picolé ao Leite">Picolé ao Leite</option>
                            <option className="text-gray-600" value="Copo">Copo</option>
                            <option className="text-gray-600" value="Pote">Pote</option>
                            <option className="text-gray-600" value="Geladinho">Geladinho</option>
                            <option className="text-gray-600" value="Casquinha">Casquinha</option>
                            <option className="text-gray-600" value="Cremosinho">Cremosinho</option>
                        </select>

                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="flavor" className="font-semibold">Variante</label>
                        <input defaultValue={filterItemData?.flavor} type="text" name="flavor" placeholder="300ml, Uva" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                    </div>
                    <div className="flex flex-col gap-3">
                        <label htmlFor="amount" className="font-semibold">Quantidade</label>
                        <input defaultValue={filterItemData?.amount} type="number" name="amount" placeholder="5" className="w-full p-3 border border-gray-300 rounded-md outline-none" />
                    </div>
                    {formState.success === false ? <p className="text-center py-3 text-red-700 font-semibold">{formState.message}</p> : ''}
                    <button className="cursor-pointer bg-yellow-500 text-white w-full rounded-lg text-xl font-bold p-3 transition-all duration-500 hover:brightness-90">
                        {pending ? <Loading /> : "Enviar"}
                    </button>
                </form>
            </div>
        </Modal>
    )
}