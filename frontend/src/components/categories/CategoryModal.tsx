import { useState } from "react";

export type Category = {
  id: string;
  name: string;
};

interface CategoryModalProps {
  categories: Category[];
  onCreate: (name: string) => void;
  onEdit: (id: string, name: string) => void;
  onDelete: (id: string) => void;
  open: boolean;
  onClose: () => void;
}

export function CategoryModal({ categories, onCreate, onEdit, onDelete, open, onClose }: CategoryModalProps) {
  const [newName, setNewName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

  function handleCreate() {
    if (newName.trim()) {
      onCreate(newName.trim());
      setNewName("");
    }
  }

  function handleEdit() {
    if (editId && editName.trim()) {
      onEdit(editId, editName.trim());
      setEditId(null);
      setEditName("");
    }
  }

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/30" onClick={onClose} />
      <div className="relative bg-white rounded-xl shadow-lg p-6 w-full max-w-md z-10">
        <h2 className="text-lg font-bold mb-4">Categorias</h2>
        <div className="mb-4">
          <input
            type="text"
            className="border rounded px-3 py-2 w-full mb-2"
            placeholder="Nova categoria"
            value={newName}
            onChange={e => setNewName(e.target.value)}
          />
          <button className="bg-indigo-600 text-white px-4 py-2 rounded w-full" onClick={handleCreate}>
            Adicionar
          </button>
        </div>
        <ul className="divide-y">
          {categories.length === 0 ? (
            <li className="py-4 text-gray-400 text-center">Nenhuma categoria cadastrada.</li>
          ) : (
            categories.map(cat => (
              <li key={cat.id} className="py-2 flex items-center justify-between gap-2">
                {editId === cat.id ? (
                  <>
                    <input
                      type="text"
                      className="border rounded px-2 py-1 flex-1"
                      value={editName}
                      onChange={e => setEditName(e.target.value)}
                    />
                    <button className="text-green-600 px-2" onClick={handleEdit}>Salvar</button>
                    <button className="text-gray-500 px-2" onClick={() => { setEditId(null); setEditName(""); }}>Cancelar</button>
                  </>
                ) : (
                  <>
                    <span className="flex-1">{cat.name}</span>
                    <button className="text-indigo-600 px-2" onClick={() => { setEditId(cat.id); setEditName(cat.name); }}>Editar</button>
                    <button className="text-red-600 px-2" onClick={() => onDelete(cat.id)}>Excluir</button>
                  </>
                )}
              </li>
            ))
          )}
        </ul>
        <button className="absolute top-2 right-2 text-gray-400 hover:text-gray-600" onClick={onClose}>
          &times;
        </button>
      </div>
    </div>
  );
}
