'use client';

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

interface ConfirmOptions {
    title?: string;
    message: string;
    confirmText?: string;
    cancelText?: string;
}

interface ConfirmContextType {
    confirm: (options: ConfirmOptions) => Promise<boolean>;
}

const ConfirmContext = createContext<ConfirmContextType | null>(null);

export function ConfirmProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [state, setState] = useState<{
        open: boolean;
        options: ConfirmOptions | null;
        resolve?: (value: boolean) => void;
    }>({
        open: false,
        options: null,
    });

    const confirm = (options: ConfirmOptions) => {
        return new Promise<boolean>((resolve) => {
            setState({
                open: true,
                options,
                resolve,
            });
        });
    };

    const close = (result: boolean) => {
        state.resolve?.(result);

        setState({
            open: false,
            options: null,
        });
    };

    return (
        <ConfirmContext.Provider value={{ confirm }}>
            {children}

            {/* MODAL */}
            {state.open && state.options && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm">

                    <div
                        className="
              bg-card border border-foreground
              shadow-[0_0_20px_#00ff41]
              p-6 w-[90%] max-w-sm
              animate-scale-in
            "
                    >

                        {/* TITLE */}
                        <h2 className="text-lg tracking-widest mb-3">
                            {state.options.title || "CONFIRM"}
                        </h2>

                        {/* MESSAGE */}
                        <p className="text-sm text-foreground/80 mb-6">
                            {state.options.message}
                        </p>

                        {/* ACTIONS */}
                        <div className="flex justify-end gap-3">

                            {/* CANCEL */}
                            <button
                                onClick={() => close(false)}
                                className="
                  px-4 py-2 border border-border
                  hover:border-foreground
                  hover:text-foreground
                  transition
                "
                            >
                                {state.options.cancelText || "CANCEL"}
                            </button>

                            {/* CONFIRM */}
                            <button
                                onClick={() => close(true)}
                                className="
                  px-4 py-2 border border-foreground
                  bg-foreground text-black
                  hover:shadow-[0_0_10px_#00ff41]
                  transition
                "
                            >
                                {state.options.confirmText || "CONFIRM"}
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </ConfirmContext.Provider>
    );
}

export function useConfirm() {
    const ctx = useContext(ConfirmContext);

    if (!ctx) {
        throw new Error("useConfirm must be used inside ConfirmProvider");
    }

    return ctx;
}
