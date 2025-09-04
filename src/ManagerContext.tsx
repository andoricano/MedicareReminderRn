import SQLite from "react-native-sqlite-storage";
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



export const ManagerProvider = ({ children }: { children: ReactNode }) => {
  const [managers, setManagers] = useState<Potion[]>([]);
  var [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    (async () => {
        db = await getDBConnection();
        console.log("DB 연결 성공!!:", db);
        await createPotionTable(db);
        console.log("DB table 초기화 성공!!:", db);
    })();
  }, []);

  // READ
  const loadPotions = async (database?: SQLite.SQLiteDatabase) => {
    const dbToUse = database || db;
    if (!dbToUse) throw new Error("DB가 아직 열리지 않음");
    const data = await getPotions(dbToUse);
    setManagers(data);
  };

  // CREATE
  const addPotionCtx = async (potion: Omit<Potion, "id">) => {
    console.log("씨발초딩년일자보지칼로쑤셔버려씨발련아addPotionCtx")
    console.log("addPotionCtx")
    console.log(db)
    console.log(db)
    console.log("씨발초딩년일자보지칼로쑤셔버려씨발련아addPotionCtx")

    if (!db) throw new Error("DB가 아직 열리지 않음");
    const id = await addPotion(db, potion);
    setManagers(prev => [...prev, { ...potion, id }]);
  };

  // UPDATE
  const updatePotionCtx = async (potion: Potion) => {
    if (!db) throw new Error("DB가 아직 열리지 않음");
    await updatePotion(db, potion);
    setManagers(prev => prev.map(p => (p.id === potion.id ? potion : p)));
  };

  // DELETE (단일)
  const deletePotionCtx = async (id: string) => {
    if (!db) throw new Error("DB가 아직 열리지 않음");
    await deletePotion(db, id);
    setManagers(prev => prev.filter(p => p.id !== id));
  };

  // DELETE (전체)
  const deleteAllPotionsCtx = async () => {
    if (!db) throw new Error("DB가 아직 열리지 않음");
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