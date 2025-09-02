"use client";
import { MainLayout } from "../../components/layout/MainLayout";
import { useTranslations, useLocale } from "next-intl";

export default function HomePage() {
    const t = useTranslations();
    const locale = useLocale();
    
    return (
        <MainLayout>
            <div className="flex flex-col items-center justify-center h-[60vh] text-center">
                <h2 className="text-3xl font-bold text-indigo-700 mb-4">{t('welcome')}</h2>
                <p className="text-lg text-gray-600 mb-6">{t('description')}</p>
                <div className="flex gap-4">
                    <a href={`/${locale}/dashboard`} className="bg-indigo-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-indigo-700 transition">{t('dashboard')}</a>
                    <a href={`/${locale}/products`} className="bg-gray-100 text-indigo-700 px-6 py-3 rounded font-semibold shadow hover:bg-gray-200 transition">{t('products')}</a>
                    <a href={`/${locale}/categories`} className="bg-gray-100 text-indigo-700 px-6 py-3 rounded font-semibold shadow hover:bg-gray-200 transition">{t('categories')}</a>
                </div>
            </div>
        </MainLayout>
    );
}
