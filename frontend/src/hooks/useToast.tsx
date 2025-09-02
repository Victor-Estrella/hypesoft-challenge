import { useState } from "react";
import { Toast } from "../components/ui/Toast";
import { ToastType } from "@/types/ToastType";


export function useToast() {
  const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

  function showToast(message: string, type: ToastType = "success") {
    setToast({ message, type });
  }

  function hideToast() {
    setToast(null);
  }

  function ToastComponent() {
    return toast ? (
      <Toast message={toast.message} type={toast.type} onClose={hideToast} />
    ) : null;
  }

  return { showToast, ToastComponent };
}
