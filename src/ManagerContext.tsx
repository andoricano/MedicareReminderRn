import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Potion } from "./models/Manager";
import { getDBConnection, createPotionTable, getPotions, addPotion, updatePotion, deletePotion, deleteAllPotions } from './db/Db';

type ManagerContextType = {
  managers: Potion[];
  setManagers: React.Dispatch<React.SetStateAction<Potion[]>>;
  loadPotions: () => Promise<void>;
  addPotionCtx: (potion: Omit<Potion, "id">) => Promise<void>;
  updatePotionCtx: (potion: Potion) => Promise<void>;
  deletePotionCtx: (id: string) => Promise<void>;
  deleteAllPotionsCtx: () => Promise<void>;
};

const ManagerContext = createContext<ManagerContextType | null>(null);

// Provider
export const ManagerProvider = ({ children }: { children: ReactNode }) => {
  const [managers, setManagers] = useState<Potion[]>([]);

  // DB 초기화 & 로드
  useEffect(() => {
    (async () => {
      const db = await getDBConnection();
      await createPotionTable(db);
      await loadPotions(); // 첫 로드
    })();
  }, []);

  // READ
  const loadPotions = async () => {
    const db = await getDBConnection();
    const data = await getPotions(db);
    setManagers(data);
  };

  // CREATE
  const addPotionCtx = async (potion: Omit<Potion, "id">) => {
    const db = await getDBConnection();
    const id = await addPotion(db, potion);
    setManagers(prev => [...prev, { ...potion, id }]);
  };

  // UPDATE
  const updatePotionCtx = async (potion: Potion) => {
    const db = await getDBConnection();
    await updatePotion(db, potion);
    setManagers(prev => prev.map(p => (p.id === potion.id ? potion : p)));
  };

  // DELETE (단일)
  const deletePotionCtx = async (id: string) => {
    const db = await getDBConnection();
    await deletePotion(db, id);
    setManagers(prev => prev.filter(p => p.id !== id));
  };

  // DELETE (전체)
  const deleteAllPotionsCtx = async () => {
    const db = await getDBConnection();
    await deleteAllPotions(db);
    setManagers([]);
  };

  return (
    <ManagerContext.Provider
      value={{ managers, setManagers, loadPotions, addPotionCtx, updatePotionCtx, deletePotionCtx, deleteAllPotionsCtx }}
    >
      {children}
    </ManagerContext.Provider>
  );
};

// Hook
export const useManager = () => {
  const ctx = useContext(ManagerContext);
  if (!ctx) throw new Error("useManager must be used within ManagerProvider");
  return ctx;
};