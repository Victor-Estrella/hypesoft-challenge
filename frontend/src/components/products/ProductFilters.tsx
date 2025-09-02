import { ProductFiltersProps } from "@/types/ProductFiltersProps";

/**
 * ProductFilters component for filtering products by name and category.
 * @param {ProductFiltersProps} props
 * @returns {JSX.Element}
 */
export function ProductFilters({ search, setSearch, category, setCategory, categories }: ProductFiltersProps) {
  return (
    <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6">
      <input
        type="text"
        placeholder="Buscar produto..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="border rounded px-3 py-2 w-full md:w-64"
      />
      <select
        value={category}
        onChange={(e) => setCategory(e.target.value)}
        className="border rounded px-3 py-2 w-full md:w-48"
      >
        <option value="">Todas as categorias</option>
        {categories.map((cat) => (
          <option key={cat.id} value={cat.id}>{cat.name}</option>
        ))}
      </select>
    </div>
  );
}
