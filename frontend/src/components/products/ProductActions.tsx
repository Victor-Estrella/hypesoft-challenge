import { ProductActionsProps } from "@/types/ProductActionsProps";

/**
 * ProductActions component for creating new products.
 * @param {ProductActionsProps} props
 * @returns {JSX.Element}
 */
export function ProductActions({ onCreate }: ProductActionsProps) {
  return (
    <div className="mb-6">
      <button className="bg-indigo-600 text-white px-4 py-2 rounded font-medium hover:bg-indigo-700 transition" onClick={onCreate}>
        Novo Produto
      </button>
    </div>
  );
}
