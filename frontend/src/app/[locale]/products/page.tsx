"use client"

import { useEffect, useState, useRef } from "react";
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
    const [error, setError] = useState(false);
    const didFetchCategories = useRef(false);

    const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

    // Buscar categorias apenas uma vez
    const fetchCategories = async () => {
        if (didFetchCategories.current) return;
        didFetchCategories.current = true;
        try {
            const res = await fetch(`${API_URL}/api/category`);
            if (!res.ok) throw new Error();
            const data = await res.json();
            setCategories(data);
        } catch {
            showToast("Erro ao buscar categorias", "error");
        }
    };

    // Buscar produtos sob demanda
    const fetchProducts = async () => {
        setLoading(true);
        setError(false);
        try {
            const res = await fetch(`${API_URL}/api/product`);
            if (!res.ok) throw new Error();
            const data = await res.json();
            setProducts(data);
        } catch {
            setError(true);
            showToast("Erro ao buscar produtos", "error");
        } finally {
            setLoading(false);
        }
    };

    // Buscar categorias e produtos ao montar
    useEffect(() => {
        fetchCategories();
        fetchProducts();
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
            const res = await fetch(`${API_URL}/api/product/${id}`, { method: "DELETE" });
            if (res.ok) {
                showToast("Produto excluído com sucesso!", "success");
                fetchProducts(); // Atualiza lista após exclusão
            } else {
                showToast("Erro ao excluir produto", "error");
            }
        }
    };
    const handleSave = async (data: any) => {
        if (editId) {
            const res = await fetch(`${API_URL}/api/product/${editId}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                showToast("Produto editado com sucesso!", "success");
                fetchProducts(); // Atualiza lista após edição
            } else {
                showToast("Erro ao editar produto", "error");
            }
        } else {
            const res = await fetch(`${API_URL}/api/product`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(data),
            });
            if (res.ok) {
                showToast("Produto criado com sucesso!", "success");
                fetchProducts(); // Atualiza lista após criação
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
            )
            : (
                <>
                    <ProductFilters search={search} setSearch={setSearch} category={category} setCategory={setCategory} categories={categories}/>
                    <ProductActions onCreate={handleCreate} />
                    <button className="bg-gray-200 px-3 py-1 rounded ml-2" onClick={fetchProducts} disabled={loading}>
                        Atualizar lista
                    </button>
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
