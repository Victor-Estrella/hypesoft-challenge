import React from "react";

interface LowStockProductsProps {
  products: Array<{
    id: string;
    name: string;
    stock: number;
    category: string;
  }>;
  categories: Array<{ id: string; name: string }>;
}

export function LowStockProducts({ products, categories }: LowStockProductsProps) {
  return (
    <div className="bg-white rounded-xl shadow p-6">
      <h2 className="text-lg font-bold mb-4 text-orange-600 flex items-center gap-2">
        Produtos com estoque baixo
        <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-semibold">{products.length}</span>
      </h2>
      {products.length === 0 ? (
        <div className="text-gray-400 text-center py-6">Nenhum produto com estoque baixo.</div>
      ) : (
        <ul className="divide-y">
          {products.map((p) => (
            <li key={p.id} className="py-3 flex items-center justify-between">
              <div>
                <span className="font-medium text-gray-800">{p.name}</span>
                <span className="ml-2 text-sm text-gray-500">({categories.find(c => c.id === p.category)?.name})</span>
              </div>
              <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded text-xs font-semibold">{p.stock} un.</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
