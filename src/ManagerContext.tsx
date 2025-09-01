import React, { createContext, useContext, useState, ReactNode } from "react";
import { realm } from "./db/realm";
import { Manager } from "./models/Manager";

const ManagerContext = createContext<{
  managers: Manager[];
  setManagers: React.Dispatch<React.SetStateAction<Manager[]>>;
} | null>(null);

// Provider
export const ManagerProvider = ({ children }: { children: ReactNode }) => {
  const [managers, setManagers] = useState<Manager[]>([]); // 빈 리스트로 초기화

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