import { ToastType } from "@/types/ToastType";
import { useEffect } from "react";


/**
 * Toast component for showing temporary messages.
 * @param {Object} props
 * @param {string} props.message
 * @param {ToastType} props.type
 * @param {() => void} props.onClose
 * @returns {JSX.Element}
 */
export function Toast({ message, type, onClose }: { message: string; type: ToastType; onClose: () => void }) {
    useEffect(() => {
        const timer = setTimeout(onClose, 2500);
        return () => clearTimeout(timer);
    }, [onClose]);

    return (
        <div className={`fixed bottom-6 right-6 z-50 px-4 py-2 rounded shadow-lg text-black font-medium transition bg-${type === "success" ? "green" : "red"}-600`}>
            {message}
        </div>
    );
}
