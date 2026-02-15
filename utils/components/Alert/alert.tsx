'use client';

import {
    createContext,
    useContext,
    useState,
    ReactNode,
} from "react";

interface AlertOptions {
    title?: string;
    message: string;
    buttonText?: string;
}

interface AlertContextType {
    alert: (options: AlertOptions) => Promise<void>;
}

const AlertContext = createContext<AlertContextType | null>(null);

export function AlertProvider({
    children,
}: {
    children: ReactNode;
}) {
    const [state, setState] = useState<{
        open: boolean;
        options: AlertOptions | null;
        resolve?: () => void;
    }>({
        open: false,
        options: null,
    });

    const alert = (options: AlertOptions) => {
        return new Promise<void>((resolve) => {
            setState({
                open: true,
                options,
                resolve,
            });
        });
    };

    const close = () => {
        state.resolve?.();

        setState({
            open: false,
            options: null,
        });
    };

    return (
        <AlertContext.Provider value={{ alert }}>
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
                            {state.options.title || "ALERT"}
                        </h2>

                        {/* MESSAGE */}
                        <p className="text-sm text-foreground/80 mb-6">
                            {state.options.message}
                        </p>

                        {/* ACTION */}
                        <div className="flex justify-end">

                            <button
                                onClick={close}
                                autoFocus
                                className="
                  px-4 py-2 border border-foreground
                  bg-foreground text-black
                  hover:shadow-[0_0_10px_#00ff41]
                  transition
                "
                            >
                                {state.options.buttonText || "OK"}
                            </button>

                        </div>

                    </div>

                </div>
            )}

        </AlertContext.Provider>
    );
}

export function useAlert() {
    const ctx = useContext(AlertContext);

    if (!ctx) {
        throw new Error("useAlert must be used inside AlertProvider");
    }

    return ctx;
}
