'use client';

import { createContext, useContext, useState, ReactNode } from "react";

type ToastType = "success" | "error" | "info";

interface Toast {
    id: number;
    message: string;
    type: ToastType;
}

interface ToastrContextType {
    toast: (msg: string, type?: ToastType) => void;
}

const ToastrContext = createContext<ToastrContextType | null>(null);

export function ToastrProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const toast = (message: string, type: ToastType = "info") => {
        const id = Date.now();

        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto remove after 3s
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    };

    return (
        <ToastrContext.Provider value={{ toast }}>
            {children}

            {/* Toast Container */}
            <div className="fixed top-5 right-5 z-50 space-y-3">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`
              px-4 py-3 rounded-sm border
              text-sm tracking-wide
              animate-slide-in
              ${getToastStyle(toast.type)}
            `}
                    >
                        {toast.message}
                    </div>
                ))}
            </div>
        </ToastrContext.Provider>
    );
}

export function useToastr() {
    const ctx = useContext(ToastrContext);

    if (!ctx) {
        throw new Error("useToastr must be used inside ToastrProvider");
    }

    return ctx;
}

function getToastStyle(type: ToastType) {
    switch (type) {
        case "success":
            return `
        bg-black
        border-foreground
        text-foreground
        shadow-[0_0_10px_#00ff41]
      `;

        case "error":
            return `
        bg-black
        border-red-500
        text-red-500
        shadow-[0_0_10px_red]
      `;

        case "info":
        default:
            return `
        bg-black
        border-border
        text-foreground/80
        shadow-[0_0_8px_#00ff41]
      `;
    }
}
