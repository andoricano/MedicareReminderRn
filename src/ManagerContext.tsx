import SQLite from "react-native-sqlite-storage";
import React, { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { Potion } from "./models/Manager";
import { getDBConnection, createPotionTable, getPotions, addPotion, updatePotion, deletePotion, deleteAllPotions } from './db/Db';

type ManagerContextType = {
  managers: Potion[];
  setManagers: React.Dispatch<React.SetStateAction<Potion[]>>;
  loadPotions: () => void;
  addPotionCtx: (potion: Omit<Potion, "id">) => void;
  updatePotionCtx: (potion: Potion, onSuccess: () => void, onError: (err: any) => void) => void;
  deletePotionCtx: (id: string, onSuccess: () => void, onError: (err: any) => void) => void;
  deleteAllPotionsCtx: (onSuccess: () => void, onError: (err: any) => void) => void;
};

const ManagerContext = createContext<ManagerContextType | null>(null);

export const ManagerProvider = ({ children }: { children: ReactNode }) => {
  const [managers, setManagers] = useState<Potion[]>([]);
  const [db, setDb] = useState<SQLite.SQLiteDatabase | null>(null);

  useEffect(() => {
    getDBConnection(
      database => {
        console.log("DB 연결 완료!");
        setDb(database);

        createPotionTable(database);

        getPotions(
          database,
          all => setManagers(all),
          err => console.error("getPotions 실패:", err)
        );
      },
      err => {
        console.error("DB 연결 실패", err);
      }
    );


  }, []);


  const loadPotions = () => {
    if (!db) return;

    getPotions(
      db,
      all => setManagers(all),
      err => console.error("getPotions 실패:", err)
    );
  };

  const addPotionCtx = (potion: Omit<Potion, "id">) => {
    if (!db) return;

    addPotion(
      db,
      potion,
      id => {
        setManagers(prev => [...prev, { ...potion, id }]);
      },
      err => {
        console.error("addPotionCtx 실패:", err);
      }
    );
  };

  const updatePotionCtx = (potion: Potion) => {
    if (!db) return;

    updatePotion(
      db,
      potion,
      () => {
        // 성공 시 상태 업데이트
        setManagers(prev => prev.map(p => p.id === potion.id ? potion : p));
      },
      err => {
        console.error("updatePotionCtx 실패:", err);
      }
    );
  };

  const deletePotionCtx = (id: string) => {
    if (!db) return;

    deletePotion(
      db,
      id,
      () => {
        // 성공 시 상태 업데이트
        setManagers(prev => prev.filter(p => p.id !== id));
      },
      err => {
        console.error("deletePotionCtx 실패:", err);
      }
    );
  };

  const deleteAllPotionsCtx = () => {
    if (!db) return;

    deleteAllPotions(
      db,
      () => {
        // 성공 시 상태 초기화
        setManagers([]);
      },
      err => {
        console.error("deleteAllPotionsCtx 실패:", err);
      }
    );
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
