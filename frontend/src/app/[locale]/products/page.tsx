"use client"

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
const ProductFilters = dynamic(() => import("../../../components/products/ProductFilters").then(mod => ({ default: mod.ProductFilters })));
const ProductActions = dynamic(() => import("../../../components/products/ProductActions").then(mod => ({ default: mod.ProductActions })));
const ProductTable = dynamic(() => import("../../../components/products/ProductTable").then(mod => ({ default: mod.ProductTable })));
const ProductForm = dynamic(() => import("../../../components/forms/ProductForm").then(mod => ({ default: mod.ProductForm })));
import { useToast } from "../../../hooks/useToast";
import Product from "../../../types/Product";

export default function ProductsPage() {
    const { showToast, ToastComponent } = useToast();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("");
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [editId, setEditId] = useState<string | null>(null);
    const [loading, setLoading] = useState(true);

    // Buscar produtos
    useEffect(() => {
        fetch("https://localhost:7159/api/product")
            .then(res => res.json())
            .then(data => setProducts(data))
            .catch(() => showToast("Erro ao buscar produtos", "error"))
            .finally(() => setLoading(false));
    }, []);

    // Buscar categorias
    useEffect(() => {
        fetch("https://localhost:7159/api/category")
            .then(res => res.json())
            .then(data => setCategories(data))
            .catch(() => showToast("Erro ao buscar categorias", "error"));
    }, []);

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
    const handleEdit = (id: string) => {
        setEditId(id);
        setModalOpen(true);
    };
    const handleDelete = async (id: string) => {
        if (window.confirm("Deseja realmente excluir este produto?")) {
            const res = await fetch(`https://localhost:7159/api/product/${id}`, { method: "DELETE" });
            if (res.ok) {
                setProducts((prev) => prev.filter((p) => p.id !== id));
                showToast("Produto excluído com sucesso!", "success");
            } else {
                showToast("Erro ao excluir produto", "error");
            }
        }
    };
    const handleSave = async (data: any) => {
        if (editId) {
            const res = await fetch(`https://localhost:7159/api/product/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const updated = await res.json();
                setProducts((prev) => prev.map((p) => p.id === editId ? updated : p));
                showToast("Produto editado com sucesso!", "success");
            } else {
                showToast("Erro ao editar produto", "error");
            }
        } else {
            const res = await fetch("https://localhost:7159/api/product", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                const newProduct = await res.json();
                setProducts((prev) => [...prev, newProduct]);
                showToast("Produto criado com sucesso!", "success");
            } else {
                showToast("Erro ao criar produto", "error");
            }
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
            {loading ? (
                <div className="text-center py-10 text-gray-400">Carregando produtos...</div>
            ) : (
                <>
                    <ProductFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory} categories={categories}/>
                    <ProductActions onCreate={handleCreate} />
                    <ProductTable products={filteredProducts} categories={categories} onEdit={handleEdit} onDelete={handleDelete}/>
                </>
            )}
            {/* Modal de formulário de produto */}
            {modalOpen && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50">
                        <div className="bg-white rounded-xl shadow-lg p-8 w-full max-w-lg relative">
                        <h2 className="text-xl font-bold mb-6">{editId ? "Editar Produto" : "Novo Produto"}</h2>
                        <ProductForm categories={categories} initialValues={initialValues} onSubmit={handleSave} onCancel={handleCancel} />
                        <button className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 text-xl" onClick={handleCancel} aria-label="Fechar" >×</button>
                    </div>
                </div>
            )}
        </div>
    );
}
