import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../styles/globals.css";
import { Sidebar } from "../components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "HypeSoft Challenge",
  description: "Sistema de gestão de produtos, categorias e estoque com dashboard interativo.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gray-50 text-gray-900 min-h-screen">
        <div className="flex min-h-screen">
          {/* Sidebar */}
          <Sidebar />
          {/* Main content */}
          <main className="flex-1 flex flex-col">
            {/* Header */}
            <Header />
            <section className="flex-1 p-8">
              {children}
            </section>
          </main>
        </div>
      </body>
    </html>
  );
}