
"use client";
import React from "react";
import { LanguageSwitcher } from "../../i18n/LanguageSwitcher";
import { useTranslations, useLocale } from "next-intl";

/**
 * Sidebar component for navigation and logout.
 * @returns {JSX.Element}
 */

export function Sidebar() {
    const t = useTranslations();
    const locale = useLocale();
    return (
        <aside className="w-64 bg-white border-r shadow-sm flex flex-col">
            <div className="h-20 flex items-center justify-center border-b">
                <a href="/" className="font-bold text-xl tracking-tight hover:text-indigo-600 transition-colors">HypeSoft</a>
            </div>
            <nav className="flex-1 px-4 py-6 space-y-2">
                <a href={`/${locale}/dashboard`} className="block px-3 py-2 rounded hover:bg-gray-100 font-medium">{t('dashboard')}</a>
                <a href={`/${locale}/products`} className="block px-3 py-2 rounded hover:bg-gray-100 font-medium">{t('products')}</a>
                <a href={`/${locale}/categories`} className="block px-3 py-2 rounded hover:bg-gray-100 font-medium">{t('categories')}</a>
            </nav>
            <div className="p-4 border-t flex flex-col gap-4">
                <button className="w-full px-3 py-2 rounded bg-gray-100 hover:bg-gray-200 text-sm font-medium">Logout</button>
            </div>
        </aside>
    );
}
