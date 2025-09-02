"use client"

import { useState } from "react";
import { mockProducts, mockCategories } from "../../../mocks/mockData";
import dynamic from "next/dynamic";
const ProductFilters = dynamic(() => import("../../../components/products/ProductFilters").then(mod => ({ default: mod.ProductFilters })));
const ProductActions = dynamic(() => import("../../../components/products/ProductActions").then(mod => ({ default: mod.ProductActions })));
const ProductTable = dynamic(() => import("../../../components/products/ProductTable").then(mod => ({ default: mod.ProductTable })));
const ProductForm = dynamic(() => import("../../../components/forms/ProductForm").then(mod => ({ default: mod.ProductForm })));
import { useToast } from "../../../hooks/useToast";

export default function ProductsPage() {
    const { showToast, ToastComponent } = useToast();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState(mockProducts);
    const [modalOpen, setModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);

    // Filtra produtos por nome e categoria
    const filteredProducts = products.filter((p) => {
        const matchesName = p.name.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = category ? p.category === category : true;
        return matchesName && matchesCategory;
    });

    // Abrir modal para criar novo produto
    const handleCreate = () => {
        setEditId(null);
        setModalOpen(true);
    };
    // Abrir modal para editar produto
    const handleEdit = (id: string) => {
        setEditId(id);
        setModalOpen(true);
    };
    // Excluir produto
    const handleDelete = (id: string) => {
        if (window.confirm("Deseja realmente excluir este produto?")) {
        setProducts((prev) => prev.filter((p) => p.id !== id));
        showToast("Produto excluído com sucesso!", "success");
        }
    };
    // Salvar produto (criar/editar)
    const handleSave = (data: any) => {
        if (editId) {
            setProducts((prev) => prev.map((p) => p.id === editId ? { ...p, ...data } : p));
            showToast("Produto editado com sucesso!", "success");
        } else {
            // Gera o ID apenas no cliente, dentro do evento
            const newId = typeof window !== 'undefined' ? `p${Math.random().toString(36).slice(2, 9)}` : '';
            setProducts((prev) => [
                ...prev,
                { ...data, id: newId },
            ]);
            showToast("Produto criado com sucesso!", "success");
        }
        setModalOpen(false);
    };
    // Cancelar modal
    const handleCancel = () => {
        setModalOpen(false);
    };

    // Dados iniciais para edição
    const initialValues = editId ? products.find((p) => p.id === editId) : undefined;

    return (
        <div className="space-y-8">
            {ToastComponent()}
            <ProductFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory} categories={mockCategories}/>
            <ProductActions onCreate={handleCreate} />
            <ProductTable products={filteredProducts} categories={mockCategories} onEdit={handleEdit} onDelete={handleDelete}/>

        {/* Modal de formulário */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
                        <h2 className="text-xl font-bold mb-6">{editId ? "Editar Produto" : "Novo Produto"}</h2>
                        <ProductForm categories={mockCategories} initialValues={initialValues} onSubmit={handleSave} onCancel={handleCancel} />
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl" onClick={handleCancel} aria-label="Fechar" >×</button>
                    </div>
                </div>
            )}
        </div>
    );
}
