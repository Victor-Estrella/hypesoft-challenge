import Product from "./Product";
import { Category } from "./Category";

export interface LowStockProductsProps {
    products: Product[];
    categories: Category[];
}
