"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ProductFormProps } from "@/types/ProductFormProps";

const schema = z.object({
    name: z.string().min(1, "Nome obrigatório"),
    description: z.string().optional(),
    price: z.number().min(0, "Preço deve ser maior ou igual a zero"),
    category: z.string().min(1, "Categoria obrigatória"),
    stock: z.number().int().min(0, "Estoque deve ser inteiro >= 0"),
});

export function ProductForm({ categories, initialValues, onSubmit, onCancel }: ProductFormProps) {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<z.infer<typeof schema>>({
        resolver: zodResolver(schema),
        defaultValues: initialValues,
    });

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-1">Nome *</label>
                <input {...register("name")} className={`border rounded px-3 py-2 w-full ${errors.name ? "border-red-500" : ""}`} placeholder="Nome do produto" />
                {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
            </div>
            <div>
                <label className="block text-sm font-medium mb-1">Descrição</label>
                <input {...register("description")} className="border rounded px-3 py-2 w-full" placeholder="Descrição" />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                    <label className="block text-sm font-medium mb-1">Preço *</label>
                    <input type="number" step="0.01" {...register("price", { valueAsNumber: true })} className={`border rounded px-3 py-2 w-full ${errors.price ? "border-red-500" : ""}`} placeholder="Preço" />
                    {errors.price && <span className="text-xs text-red-500">{errors.price.message}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Categoria *</label>
                    <select {...register("category")} className={`border rounded px-3 py-2 w-full ${errors.category ? "border-red-500" : ""}`}>
                        <option value="">Selecione</option>
                        {categories.map((cat) => (
                            <option key={cat.id} value={cat.id}>{cat.name}</option>
                        ))}
                    </select>
                    {errors.category && <span className="text-xs text-red-500">{errors.category.message}</span>}
                </div>
                <div>
                    <label className="block text-sm font-medium mb-1">Estoque *</label>
                    <input type="number" {...register("stock", { valueAsNumber: true })} className={`border rounded px-3 py-2 w-full ${errors.stock ? "border-red-500" : ""}`} placeholder="Quantidade" />
                    {errors.stock && <span className="text-xs text-red-500">{errors.stock.message}</span>}
                </div>
            </div>
            <div className="flex gap-4 mt-4">
                <button type="submit" disabled={isSubmitting} className="bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-700 transition">
                    Salvar
                </button>
                {onCancel && (
                    <button type="button" onClick={onCancel} className="bg-gray-100 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-200 transition">
                        Cancelar
                    </button>
                )}
            </div>
        </form>
    );
}
