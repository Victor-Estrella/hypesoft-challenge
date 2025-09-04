"use client"
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const CategoryModal = dynamic(() => import("../../../components/categories/CategoryModal").then(mod => ({ default: mod.CategoryModal })));
import { useToast } from "../../../hooks/useToast";
import { Category } from "@/types/Category";

export default function CategoriesPage() {
    const [categories, setCategories] = useState<Category[]>([]);
    const [modalOpen, setModalOpen] = useState(false);
    const { showToast, ToastComponent } = useToast();

    // Buscar categorias do backend
    useEffect(() => {
        fetch("https://localhost:7159/api/category")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => showToast("Erro ao buscar categorias", "error"));
    }, []);

    async function handleCreate(name: string) {
        if (!name.trim()) {
            showToast("Nome da categoria não pode ser vazio.", "error");
            return;
        }
        if (categories.some(cat => cat.name.toLowerCase() === name.trim().toLowerCase())) {
            showToast("Categoria já existe.", "error");
            return;
        }
        const res = await fetch("https://localhost:7159/api/category", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        if (res.ok) {
            const newCategory = await res.json();
            setCategories(prev => [...prev, newCategory]);
            showToast("Categoria criada com sucesso!", "success");
        } else {
            showToast("Erro ao criar categoria", "error");
        }
    }

    async function handleEdit(id: string, name: string) {
        if (!name.trim()) {
            showToast("Nome da categoria não pode ser vazio.", "error");
            return;
        }
        if (categories.some(cat => cat.name.toLowerCase() === name.trim().toLowerCase() && cat.id !== id)) {
            showToast("Categoria já existe.", "error");
            return;
        }
        const res = await fetch(`https://localhost:7159/api/category/${id}`, {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name }),
        });
        if (res.ok) {
            const updated = await res.json();
            setCategories(prev => prev.map(cat => cat.id === id ? updated : cat));
            showToast("Categoria editada com sucesso!", "success");
        } else {
            showToast("Erro ao editar categoria", "error");
        }
    }

    async function handleDelete(id: string) {
        const res = await fetch(`https://localhost:7159/api/category/${id}`, { method: "DELETE" });
        if (res.ok) {
            setCategories(prev => prev.filter(cat => cat.id !== id));
            showToast("Categoria excluída com sucesso!", "success");
        } else {
            showToast("Erro ao excluir categoria", "error");
        }
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
