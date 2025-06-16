"use client";
import { createContext, useContext, useState } from "react";

const TransitionContext = createContext<{
  sidebarTransition: boolean;
  setSidebarTransition: (v: boolean) => void;
}>({
  sidebarTransition: false,
  setSidebarTransition: () => {},
});

export function TransitionProvider({ children }: { children: React.ReactNode }) {
  const [sidebarTransition, setSidebarTransition] = useState(false);
  return (
    <TransitionContext.Provider value={{ sidebarTransition, setSidebarTransition }}>
      {children}
    </TransitionContext.Provider>
  );
}

export function useSidebarTransition() {
  return useContext(TransitionContext);
} 