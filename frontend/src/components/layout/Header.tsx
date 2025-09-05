"use client";

import React from "react";
import { LanguageSwitcher } from "../../i18n/LanguageSwitcher";
import { useTranslations } from "next-intl";
import useKeycloak from "@/hooks/useKeycloak";
import { useRouter } from "next/navigation";

/**
 * Header component for displaying the system title, user info, avatar and language switcher.
 * @returns {JSX.Element}
 */


export function Header(){
    const t = useTranslations();
    const { logout } = useKeycloak();
    const router = useRouter();

    return (
        <header className="h-20 px-8 flex items-center border-b bg-white">
            <h1 className="text-lg md:text-2xl font-semibold">{t('systemTitle')}</h1>
            <div className="ml-auto flex items-center gap-4">
                <LanguageSwitcher />
                <button onClick={() => logout('http://localhost:3000/')} className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition ">Logout</button>
            </div>
        </header>
    )
}