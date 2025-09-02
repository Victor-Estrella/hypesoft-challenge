import { MainLayout } from "../components/layout/MainLayout";

export default function HomePage() {
  return (
    <MainLayout>
      <div className="flex flex-col items-center justify-center h-[60vh] text-center">
        <h2 className="text-3xl font-bold text-indigo-700 mb-4">Bem-vindo ao HypeSoft Challenge</h2>
        <p className="text-lg text-gray-600 mb-6">Sistema de gestão de produtos, categorias e estoque com dashboard interativo.</p>
        <div className="flex gap-4">
          <a href="/dashboard" className="bg-indigo-600 text-white px-6 py-3 rounded font-semibold shadow hover:bg-indigo-700 transition">Ir para Dashboard</a>
          <a href="/products" className="bg-gray-100 text-indigo-700 px-6 py-3 rounded font-semibold shadow hover:bg-gray-200 transition">Ver Produtos</a>
          <a href="/categories" className="bg-gray-100 text-indigo-700 px-6 py-3 rounded font-semibold shadow hover:bg-gray-200 transition">Ver Categorias</a>
        </div>
      </div>
    </MainLayout>
  );
}