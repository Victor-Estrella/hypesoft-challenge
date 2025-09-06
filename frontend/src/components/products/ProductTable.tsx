import Product from "@/types/Product";
import { useState } from "react";

const PAGE_SIZE = 5;

/**
 * ProductTable component for displaying products with sorting and pagination.
 * @param {Object} props
 * @param {Product[]} props.products
 * @param {{ id: string; name: string }[]} props.categories
 * @param {(id: string) => void} props.onEdit
 * @param {(id: string) => void} props.onDelete
 * @returns {JSX.Element}
 */
export function ProductTable({ products, categories, onEdit, onDelete }: {
  products: Product[];
  categories: { id: string; name: string }[];
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}) {
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState<{ field: keyof Product; direction: "asc" | "desc" }>({ field: "name", direction: "asc" });

  // Ordenação
  const sortedProducts = [...products].sort((a, b) => {
    const field = sort.field;
    if (a[field] < b[field]) return sort.direction === "asc" ? -1 : 1;
    if (a[field] > b[field]) return sort.direction === "asc" ? 1 : -1;
    return 0;
  });

  // Paginação
  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
  const paginatedProducts = sortedProducts.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleSort(field: keyof Product) {
    setSort((prev) => ({
      field,
      direction: prev.field === field ? (prev.direction === "asc" ? "desc" : "asc") : "asc",
    }));
  }

  return (
    <div className="overflow-x-auto">
      <table className="md:min-w-full bg-white rounded-xl shadow text-xs sm:text-sm">
        <thead>
          <tr className="bg-gray-50">
            <th className="px-2 sm:px-4 py-2 text-left font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort("name")}>Nome {sort.field === "name" ? (sort.direction === "asc" ? "▲" : "▼") : ""}</th>
            <th className="px-2 sm:px-4 py-2 text-left font-semibold text-gray-600 xs:table-cell">Descrição</th>
            <th className="px-2 sm:px-4 py-2 text-left font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort("price")}>Preço {sort.field === "price" ? (sort.direction === "asc" ? "▲" : "▼") : ""}</th>
            <th className="px-2 sm:px-4 py-2 text-left font-semibold text-gray-600 xs:table-cell">Categoria</th>
            <th className="px-2 sm:px-4 py-2 text-left font-semibold text-gray-600 cursor-pointer" onClick={() => handleSort("stockQuantity")}>Estoque {sort.field === "stockQuantity" ? (sort.direction === "asc" ? "▲" : "▼") : ""}</th>
            <th className="px-2 sm:px-4 py-2"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedProducts.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center py-8 text-gray-400">Nenhum produto encontrado.</td>
            </tr>
          ) : (
            paginatedProducts.map((p) => (
              <tr key={p.id} className="border-b last:border-b-0 hover:bg-gray-50 transition">
                <td className="px-2 sm:px-4 py-2 font-medium break-words max-w-[120px] xs:max-w-none">{p.name}</td>
                <td className="px-2 sm:px-4 py-2 text-gray-500 xs:table-cell break-words max-w-[120px] xs:max-w-none">{p.description}</td>
                <td className="px-2 sm:px-4 py-2 text-green-700 font-semibold">R$ {p.price.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                <td className="px-2 sm:px-4 py-2 text-sm xs:table-cell">{categories.find((cat) => cat.id === p.category)?.name}</td>
                <td className={`px-2 sm:px-4 py-2 font-bold ${p.stockQuantity < 10 ? 'text-orange-600' : 'text-gray-700'}`}>{p.stockQuantity}</td>
                <td className="px-2 sm:px-4 py-2 flex gap-1 sm:gap-2 flex-col xs:flex-row">
                  <button className="text-indigo-600 hover:underline text-xs sm:text-sm" onClick={() => onEdit(p.id)}>Editar</button>
                  <button className="text-red-600 hover:underline text-xs sm:text-sm" onClick={() => onDelete(p.id)}>Excluir</button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
      {/* Paginação */}
      <div className="flex justify-end items-center gap-2 mt-4">
        <button className="px-2 py-1 rounded bg-gray-100" disabled={page === 1} onClick={() => setPage(page - 1)}>&lt;</button>
        <span className="text-xs sm:text-sm">Página {page} de {totalPages}</span>
        <button className="px-2 py-1 rounded bg-gray-100" disabled={page === totalPages} onClick={() => setPage(page + 1)}>&gt;</button>
      </div>
    </div>
  );
}
