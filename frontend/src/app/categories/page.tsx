"use client"
import { useState } from "react";
import { CategoryModal, Category } from "../../components/categories/CategoryModal";
import { useToast } from "../../hooks/useToast";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([
        { id: "cat-1", name: "Eletrônicos" },
        { id: "cat-2", name: "Roupas" },
        { id: "cat-3", name: "Alimentos" },
    ]);
    const [modalOpen, setModalOpen] = useState(false);
    const { showToast, ToastComponent } = useToast();

    function handleCreate(name: string) {
        if (!name.trim()) {
        showToast("Nome da categoria não pode ser vazio.", "error");
        return;
        }
        if (categories.some(cat => cat.name.toLowerCase() === name.trim().toLowerCase())) {
        showToast("Categoria já existe.", "error");
        return;
        }
        setCategories(prev => [
        ...prev,
        { id: `cat-${prev.length + 1}`, name: name.trim() }
        ]);
        showToast("Categoria criada com sucesso!", "success");
    }

    function handleEdit(id: string, name: string) {
        if (!name.trim()) {
        showToast("Nome da categoria não pode ser vazio.", "error");
        return;
        }
        if (categories.some(cat => cat.name.toLowerCase() === name.trim().toLowerCase() && cat.id !== id)) {
        showToast("Categoria já existe.", "error");
        return;
        }
        setCategories(prev => prev.map(cat => cat.id === id ? { ...cat, name: name.trim() } : cat));
        showToast("Categoria editada com sucesso!", "success");
    }

    function handleDelete(id: string) {
        setCategories(prev => prev.filter(cat => cat.id !== id));
        showToast("Categoria excluída com sucesso!", "success");
    }

    return (
        <div className="max-w-xl mx-auto py-10">
            <ToastComponent />
            <h1 className="text-2xl font-bold mb-6">Gestão de Categorias</h1>
            <button className="bg-indigo-600 text-white px-4 py-2 rounded mb-4" onClick={() => setModalOpen(true)} disabled={modalOpen}>
                Gerenciar Categorias
            </button>
            <ul className="divide-y bg-white rounded-xl shadow">
                {categories.length === 0 ? ( <li className="py-6 text-gray-400 text-center">Nenhuma categoria cadastrada.</li> ) : (
                    categories.map(cat => (
                        <li key={cat.id} className="py-3 px-4 flex items-center justify-between">
                            <span>{cat.name}</span>
                        </li>
                    ))
                )}
            </ul>
            <CategoryModal categories={categories} onCreate={handleCreate} onEdit={handleEdit} onDelete={handleDelete} open={modalOpen}
                onClose={() => setModalOpen(false)}
            />
        </div>
    );
}
