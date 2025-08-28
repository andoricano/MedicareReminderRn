import React, { createContext, useContext, useState, ReactNode } from "react";
type Manager = {
  type : Potion;
  totalNum: number;
  eatingNum: number;
  restNum : number;
  alarm: Check[];
  cycle: Date[];
}

type Check = {
  ate : number;
  time: Date;
}

type Potion = {
  name: string;
  type : Eating;
  description: String;
  bundleNum: number;
  Todo:number;
}
enum Eating {
    Capsule, Gel, Raw, Drinking, Stick, Sncak, Basket
}

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