import { useActionState, useRef, useState } from "react";
import { Modal } from "..";
import { updateSale } from "@/actions/saleActions";
import { toast } from "react-toastify";
import { handleMoneyChange } from "@/utils/moneyMask";
import { Loading } from "@/components/loading";
import { SalesType } from "@/@types/SalesType";

interface UpdateSaleModalProps {
    sales: SalesType;
    isOpen: boolean;
    setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

export function UpdateSaleModal({ sales, isOpen, setIsOpen }: UpdateSaleModalProps) {

    function normalizeCategory(category: string) {
        if (category.startsWith("Copo")) return "Copo";
        if (category.startsWith("Pote")) return "Pote";
        return category;
    }

    const [category, setCategory] = useState(normalizeCategory(sales.category));
    const formRef = useRef<HTMLFormElement>(null);

    async function actionSale(prevState: { success: boolean; message?: string }, formData: FormData) {
        const result = await updateSale(prevState, formData, sales.id);

        if (result.success) {
            setIsOpen(false);
            toast.success(result.message);
        } else {
            toast.error(result.message);
        }

        return result;
    }

    const [formState, formAction, pending] = useActionState(actionSale, { success: false });

    return (
        <Modal isOpenModal={isOpen} setIsOpenModal={setIsOpen} formRef={formRef} setCategory={setCategory}>
            <form ref={formRef} action={formAction} className="py-12 grid grid-cols-1 gap-4">
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

                    {category === "Pote" && (
                        <select
                            name="typeOfPot"
                            className="w-full mt-3 p-3 border border-gray-300 rounded-md outline-none"
                        >
                            <option className="text-gray-600" value="">Selecione o tipo</option>
                            <option className="text-gray-600" value="Açãi">Açãi</option>
                            <option className="text-gray-600" value="Sorvete">Sorvete</option>
                        </select>
                    )}

                    {category === "Copo" && (
                        <select
                            name="cupSize"
                            className="w-full mt-3 p-3 border border-gray-300 rounded-md outline-none"
                        >
                            <option className="text-gray-600" value="">Selecione o tamanho</option>
                            <option className="text-gray-600" value="150ml">150ml</option>
                            <option className="text-gray-600" value="200ml">200ml</option>
                            <option className="text-gray-600" value="300ml">300ml</option>
                            <option className="text-gray-600" value="400ml">400ml</option>
                            <option className="text-gray-600" value="500ml">500ml</option>
                            <option className="text-gray-600" value="700ml">700ml</option>
                            <option className="text-gray-600" value="1l">1l</option>
                        </select>
                    )}
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="flavor" className="font-semibold">Sabor</label>
                    <input
                        defaultValue={sales.flavor}
                        type="text"
                        name="flavor"
                        placeholder="Chocolate"
                        className="w-full p-3 border border-gray-300 rounded-md outline-none"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="price" className="font-semibold">Preço</label>
                    <input
                        defaultValue={sales.price}
                        type="text"
                        name="price"
                        onInput={handleMoneyChange}
                        placeholder="2,50"
                        className="w-full p-3 border border-gray-300 rounded-md outline-none"
                    />
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="type" className="font-semibold">Especifique a operação</label>
                    <select
                        defaultValue={sales.type}
                        name="type"
                        className="w-full p-3 border border-gray-300 rounded-md outline-none"
                    >
                        <option value="venda">Venda</option>
                        <option value="entrada">Entrada</option>
                    </select>
                </div>

                <div className="flex flex-col gap-3">
                    <label htmlFor="amount" className="font-semibold">Quantidade</label>
                    <input
                        defaultValue={sales.amount}
                        type="number"
                        name="amount"
                        placeholder="Não especificar se for apenas 1"
                        className="w-full p-3 border border-gray-300 rounded-md outline-none"
                    />
                </div>

                {formState.success === false && (
                    <p className="text-center py-3 text-red-700 font-semibold">
                        {formState.message}
                    </p>
                )}

                <button className="cursor-pointer bg-yellow-500 text-white w-full rounded-lg text-xl font-bold p-3 transition-all duration-500 hover:brightness-90">
                    {pending ? <Loading /> : "Atualizar"}
                </button>
            </form>
        </Modal>
    );
}