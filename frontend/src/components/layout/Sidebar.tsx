"use client";
import React, { useState } from "react";
import { useTranslations, useLocale } from "next-intl";

/**
 * Sidebar component for navigation and logout.
 * @returns {JSX.Element}
 */

export function Sidebar() {
    const t = useTranslations();
    const locale = useLocale();
    const [open, setOpen] = useState(false);

    return (
        <>
            {/* Botão hamburger visível apenas em telas pequenas */}
            <button className="md:hidden fixed top-4 left-4 z-50 p-2 rounded bg-white shadow border" onClick={() => setOpen(!open)} aria-label="Abrir menu">
                <svg width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-indigo-600">
                    <line x1="3" y1="12" x2="21" y2="12" />
                    <line x1="3" y1="6" x2="21" y2="6" />
                    <line x1="3" y1="18" x2="21" y2="18" />
                </svg>
            </button>
            {/* Sidebar responsiva */}
            <aside className={`bg-white border-r shadow-sm flex flex-col fixed top-0 left-0 h-full lg:h-auto w-64 z-40 transition-transform duration-300 md:static md:translate-x-0 ${open ? "translate-x-0" : "-translate-x-full"}`}>
                <div className="h-20 flex items-center justify-center border-b">
                    <a href={`/${locale}/`} className="font-bold text-xl tracking-tight hover:text-indigo-600 transition-colors">HypeSoft</a>
                </div>
                <nav className="flex-1 px-4 py-6 space-y-2">
                    <a href={`/${locale}/dashboard`} className="block px-3 py-2 rounded hover:bg-gray-100 font-medium">{t('dashboard')}</a>
                    <a href={`/${locale}/products`} className="block px-3 py-2 rounded hover:bg-gray-100 font-medium">{t('products')}</a>
                    <a href={`/${locale}/categories`} className="block px-3 py-2 rounded hover:bg-gray-100 font-medium">{t('categories')}</a>
                </nav>
                {/* Botão para fechar o menu em mobile */}
                <button className="md:hidden m-4 px-4 py-2 rounded bg-indigo-600 text-white font-semibold" onClick={() => setOpen(false)}>Fechar</button>
            </aside>
            {/* Overlay para fechar o menu ao clicar fora */}
            {open && (
                <div className="fixed inset-0 bg-black/30 bg-opacity-30 z-30 md:hidden" onClick={() => setOpen(false)}/>
            )}
        </>
    );
}
