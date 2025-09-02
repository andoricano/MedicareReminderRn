import React, { createContext, useContext, useState, ReactNode } from "react";
import { Potion } from "./models/Manager";

const ManagerContext = createContext<{
  managers: Potion[];
  setManagers: React.Dispatch<React.SetStateAction<Potion[]>>;
} | null>(null);

// Provider
export const ManagerProvider = ({ children }: { children: ReactNode }) => {
  const [managers, setManagers] = useState<Potion[]>([]); // 빈 리스트로 초기화

  return (
    <ManagerContext.Provider value={{ managers, setManagers }}>
      {children}
    </ManagerContext.Provider>
  );
};

// 훅으로 사용
export const useManager = () => {
  const ctx = useContext(ManagerContext);
  if (!ctx) throw new Error("useManager must be used within ManagerProvider");
  return ctx;
};