"use client";
import React from "react";
import { LanguageSwitcher } from "../../i18n/LanguageSwitcher";
import { useTranslations } from "next-intl";

export function Header(){
    const t = useTranslations();
    return (
        <header className="h-20 px-8 flex items-center border-b bg-white">
            <h1 className="text-2xl font-semibold">{t('systemTitle')}</h1>
            <div className="ml-auto flex items-center gap-4">
                <span className="text-sm text-gray-600">Olá, Usuário</span>
                <img src="/avatar.png" alt="Avatar" className="w-8 h-8 rounded-full border" />
                <LanguageSwitcher />
            </div>
        </header>
    )
}