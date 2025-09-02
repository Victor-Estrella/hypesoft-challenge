import { Category } from "./Category";

export interface ProductFormProps {
    categories: Category[];
    initialValues?: any;
    onSubmit: (data: any) => void;
    onCancel: () => void;
}
