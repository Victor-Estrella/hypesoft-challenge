"use client";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


/**
 * ProductsByCategoryChart component for displaying products grouped by category.
 * @param {{ products: any[]; categories: any[] }} props
 * @returns {JSX.Element}
 */
export function ProductsByCategoryChart({ products, categories }: { products: any[]; categories: any[] }) {
    // Agrupa produtos por categoria
    const data = categories.map((cat) => ({
        name: cat.name,
        produtos: products.filter((p) => p.category === cat.id).length,
    }));

    return (
        <div className="bg-white rounded-xl shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Produtos por Categoria</h2>
            <ResponsiveContainer width="100%" height={250}>
                <BarChart data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis allowDecimals={false} />
                <Tooltip />
                <Bar dataKey="produtos" fill="#6366f1" radius={[4, 4, 0, 0]} />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}
