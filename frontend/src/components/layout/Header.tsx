import React from "react";

export function Header(){
    return (
        <header className="h-20 px-8 flex items-center border-b bg-white">
            <h1 className="text-2xl font-semibold">Sistema de Gestão de Produtos</h1>
            <div className="ml-auto flex items-center gap-4">
                {/* Usuário logado (mock) */}
                <span className="text-sm text-gray-600">Olá, Usuário</span>
                <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full border" />
            </div>
        </header>
    )
}