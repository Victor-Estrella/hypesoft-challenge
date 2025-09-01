import { DashboardCards } from "../../components/dashboard/DashboardCards";
import { ProductsByCategoryChart } from "../../components/dashboard/ProductsByCategoryChart";
import { mockProducts, mockCategories } from "../../mocks/mockData";

export default function DashboardPage() {
    // Cálculos dos cards
    const totalProducts = mockProducts.length;
    const totalStockValue = mockProducts.reduce((acc, p) => acc + p.price * p.stock, 0);
    const lowStockProducts = mockProducts.filter((p) => p.stock < 10);

    return (
        <div className="grid grid-cols-1 gap-8 xl:grid-cols-2">
            <DashboardCards totalProducts={totalProducts} totalStockValue={totalStockValue} lowStockCount={lowStockProducts.length}/>
            <div className="col-span-1 xl:col-span-2">
                <ProductsByCategoryChart products={mockProducts} categories={mockCategories} />
            </div>
        </div>
    );
}
