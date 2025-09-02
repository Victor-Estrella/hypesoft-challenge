import React from "react";

export function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
            <div className="h-20 flex items-center justify-center border-b">
                <span className="font-bold text-xl tracking-tight">ShopSense</span>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <a href="/dashboard" className="block px-3 py-2 rounded hover:bg-gray-100 font-medium">Dashboard</a>
                <a href="/products" className="block px-3 py-2 rounded hover:bg-gray-100 font-medium">Produtos</a>
                <a href="/categories" className="block px-3 py-2 rounded hover:bg-gray-100 font-medium">Categorias</a>
            </nav>
            <div className="p-4 border-t">
                <button className="w-full px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm font-medium">Logout</button>
            </div>
        </aside>
    );
}
