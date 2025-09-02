import { DashboardCardsProps } from "@/types/DashboardCardsProps";

export function DashboardCards({ totalProducts, totalStockValue, lowStockCount }: DashboardCardsProps) {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 mb-10">
            {/* Card 1 */}
            <div className="group bg-white rounded-xl border-l-4 border-indigo-500 shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-row items-center gap-4 cursor-pointer">
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-medium">Total de Produtos</span>
                    <span className="text-3xl font-extrabold mt-1 text-gray-900 tracking-tight">{totalProducts}</span>
                </div>
            </div>
            {/* Card 2 */}
            <div className="group bg-white rounded-xl border-l-4 border-green-500 shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-row items-center gap-4 cursor-pointer">
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-medium">Valor Total do Estoque</span>
                    <span className="text-3xl font-extrabold mt-1 text-green-700 tracking-tight">{`R$ ${totalStockValue.toLocaleString('pt-BR', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`}</span>
                </div>
            </div>
            {/* Card 3 */}
            <div className="group bg-white rounded-xl border-l-4 border-orange-500 shadow-sm hover:shadow-lg transition-shadow p-6 flex flex-row items-center gap-4 cursor-pointer">
                <div className="flex flex-col items-start">
                    <span className="text-xs text-gray-500 font-medium">Produtos com Estoque Baixo</span>
                    <span className="text-3xl font-extrabold mt-1 text-orange-700 tracking-tight">{lowStockCount}</span>
                </div>
            </div>
        </div>
    );
}
