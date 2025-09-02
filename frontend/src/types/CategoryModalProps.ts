import { Category } from "./Category";

export interface CategoryModalProps {
    categories: Category[];
    onCreate: (name: string) => void;
    onEdit: (id: string, name: string) => void;
    onDelete: (id: string) => void;
    open: boolean;
    onClose: () => void;
}
