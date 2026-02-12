"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface UIContextType {
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
}

const UIContext = createContext<UIContextType | undefined>(undefined);

export function UIProvider({ children }: { children: ReactNode }) {
  const [isCartOpen, setIsCartOpen] = useState(false);

  return (
    <UIContext.Provider value={{ isCartOpen, setIsCartOpen }}>
      {children}
    </UIContext.Provider>
  );
}

export function useUI() {
  const context = useContext(UIContext);
  if (context === undefined) {
    throw new Error("useUI must be used within a UIProvider");
  }
  return context;
}
