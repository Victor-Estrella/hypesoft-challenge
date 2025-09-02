import { Category } from "./Category";

export interface ProductFiltersProps {
    search: string;
    setSearch: (value: string) => void;
    category: string;
    setCategory: (value: string) => void;
    categories: Category[];
}
