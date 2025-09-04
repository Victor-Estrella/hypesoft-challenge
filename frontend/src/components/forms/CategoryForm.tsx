import { useForm } from "react-hook-form";

export default function CategoryForm({ onSubmit, onCancel }: { onSubmit: (data: any) => void; onCancel: () => void }) {
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<{ name: string }>();

    return (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
                <label className="block text-sm font-medium mb-1">Nome da Categoria *</label>
                <input {...register("name", { required: "Nome obrigatório" })} className={`border rounded px-3 py-2 w-full ${errors.name ? "border-red-500" : ""}`} placeholder="Nome da categoria" />
                {errors.name && <span className="text-xs text-red-500">{errors.name.message}</span>}
            </div>
            <div className="flex gap-4 mt-4">
                <button type="submit" disabled={isSubmitting} className="bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-700 transition">
                    Salvar
                </button>
                <button type="button" onClick={onCancel} className="bg-gray-100 text-gray-700 px-4 py-2 rounded font-medium hover:bg-gray-200 transition">
                    Cancelar
                </button>
            </div>
        </form>
    );
}
