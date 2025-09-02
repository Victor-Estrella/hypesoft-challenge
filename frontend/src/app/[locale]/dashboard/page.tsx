import dynamic from "next/dynamic";
const DashboardCards = dynamic(() => import("../../../components/dashboard/DashboardCards").then(mod => ({ default: mod.DashboardCards })));
const ProductsByCategoryChart = dynamic(() => import("../../../components/dashboard/ProductsByCategoryChart").then(mod => ({ default: mod.ProductsByCategoryChart })));
const LowStockProducts = dynamic(() => import("../../../components/dashboard/LowStockProducts").then(mod => ({ default: mod.LowStockProducts })));
import { mockProducts, mockCategories } from "../../../mocks/mockData";

export default function DashboardPage() {
    // Cálculos dos cards
    const totalProducts = mockProducts.length;
    const totalStockValue = mockProducts.reduce((acc, p) => acc + p.price * p.stock, 0);
    const lowStockProducts = mockProducts.filter((p) => p.stock < 10);

    return (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            <div className="space-y-6">
                <DashboardCards totalProducts={totalProducts} totalStockValue={totalStockValue} lowStockCount={lowStockProducts.length}/>
                <LowStockProducts products={lowStockProducts} categories={mockCategories} />
            </div>
            <div className="bg-white rounded-xl shadow p-6 flex flex-col justify-center">
                <ProductsByCategoryChart products={mockProducts} categories={mockCategories} />
            </div>
        </div>
    );
}
