import React, { useState } from "react";
import Utils from "../utils";
import { ToastContainer, ToastProps } from "../components/Toast";

interface ToastContextValue {
    add: (content: React.ReactNode, props?: Pick<ToastProps, "type">) => void;
}

const ToastContext = React.createContext<ToastContextValue | null>(null);
ToastContext.displayName = "ToastContext";

function useToast() {
    const context = React.useContext(ToastContext);
    if (!context) return () => {};

    return context.add;
}

function ToastProvider({ children }: { children: React.ReactNode }) {
    const [list, setList] = useState<ToastProps[]>([]);

    return (
        <ToastContext.Provider
            value={{
                add(content, props) {
                    setList((prevList) => [
                        ...prevList,
                        { id: Utils.uuidV4(), ...props, content },
                    ]);
                },
            }}
        >
            <ToastContainer list={list} setList={setList} />
            {children}
        </ToastContext.Provider>
    );
}

export { ToastProvider, useToast };
