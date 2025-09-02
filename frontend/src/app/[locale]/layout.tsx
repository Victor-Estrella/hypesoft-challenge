import type { Metadata } from "next";
import "../../styles/globals.css";
import { NextIntlClientProvider } from "next-intl";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

export const metadata: Metadata = {
    title: "HypeSoft Challenge",
    description: "Sistema de gestão de produtos, categorias e estoque com dashboard interativo.",
};

export default async function RootLayout({ children, params }: { children: React.ReactNode, params: { locale: string } }) {
    const awaitedParams = await params;
    const locale = awaitedParams.locale ?? 'pt';
    const messages = locale === 'en'
        ? (await import('../../../messages/en.json')).default
        : (await import('../../../messages/pt.json')).default;
    return (
        <NextIntlClientProvider locale={locale} messages={messages}>
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 flex flex-col">
                    <Header />
                    <section className="flex-1 p-8">
                        {children}
                    </section>
                </main>
            </div>
        </NextIntlClientProvider>
    );
}
