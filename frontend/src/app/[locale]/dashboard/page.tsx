"use client"

import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Product from "@/types/Product";
import { Category } from "@/types/Category";
const DashboardCards = dynamic(() => import("../../../components/dashboard/DashboardCards").then(mod => ({ default: mod.DashboardCards })));
const ProductsByCategoryChart = dynamic(() => import("../../../components/dashboard/ProductsByCategoryChart").then(mod => ({ default: mod.ProductsByCategoryChart })));
const LowStockProducts = dynamic(() => import("../../../components/dashboard/LowStockProducts").then(mod => ({ default: mod.LowStockProducts })));

export default function DashboardPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [categories, setCategories] = useState<Category[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        Promise.all([
            fetch("https://localhost:7159/api/product").then(res => res.json()),
            fetch("https://localhost:7159/api/category").then(res => res.json())
        ]).then(([prod, cat]) => {
            setProducts(prod);
            setCategories(cat);
        }).catch(() => {
            setProducts([]);
            setCategories([]);
        }).finally(() => setLoading(false));
    }, []);

    // Cálculos dos cards
    const totalProducts = products.length;
        const totalStockValue = products?.reduce((acc, product) => {
            const stock = product.stockQuantity ?? 0;
            const price = product.price ?? 0;
            return acc + (stock * price);
        }, 0) ?? 0;
    const lowStockProducts = products.filter((p) => (typeof p.stockQuantity === 'number' ? p.stockQuantity : 0) < 10);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-6">
                <DashboardCards totalProducts={totalProducts} totalStockValue={totalStockValue} lowStockCount={lowStockProducts.length}/>
                <LowStockProducts products={lowStockProducts} categories={categories} />
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-center">
                <ProductsByCategoryChart products={products} categories={categories} />
            </div>
        </div>
    );
}
