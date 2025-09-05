import type { Metadata } from "next";
import "../../styles/globals.css";
import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";
import I18nProvider from "@/i18n/I18nProvider";

export const metadata: Metadata = {
    title: "HypeSoft Challenge",
    description: "Sistema de gestão de produtos, categorias e estoque com dashboard interativo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <I18nProvider timeZone="America/Sao_Paulo">
            <div className="flex min-h-screen">
                <Sidebar />
                <main className="flex-1 flex flex-col">
                    <Header />
                    <section className="flex-1 p-8">
                        {children}
                    </section>
                </main>
            </div>
        </I18nProvider>
    );
}
