import SQLite from "react-native-sqlite-storage";
import uuid from "react-native-uuid";
import { Eating, Potion } from "../models/Manager"
import { Platform } from "react-native";
import RNFS from 'react-native-fs';


export const getDBConnection = (
  onSuccess: (db: SQLite.SQLiteDatabase) => void,
  onError: (err: any) => void
) => {

  console.log("DB path:");
  if (Platform.OS === "android") {
    console.log(RNFS.DocumentDirectoryPath + "/poti.db");
  } else {
    console.log(RNFS.LibraryDirectoryPath + "/poti.db");
  }
  SQLite.openDatabase(
    { name: "poti.db", location: "default" },
    db => {
      console.log("DB open success ");
      onSuccess(db);
    },
    err => {
      console.error("SQLite open error:", err);
      onError(err);
    }
  );
};

export const createPotionTable = async (db: SQLite.SQLiteDatabase) => {
  db.transaction((tx) => {
    tx.executeSql(
      `
      CREATE TABLE IF NOT EXISTS potion (
      id TEXT PRIMARY KEY NOT NULL,
      name TEXT NOT NULL,
      eatingType TEXT,
      time TEXT,
      bundleNum INTEGER,
      Todo INTEGER,
      ate INTEGER,
      totalNum INTEGER,
      eatingNum INTEGER,
      restNum INTEGER,
      description TEXT
    );
      `
    )
  })
};
export const getPotions = (
  db: SQLite.SQLiteDatabase,
  onSuccess: (potions: Potion[]) => void,
  onError: (err: any) => void
) => {
  db.transaction(tx => {
    tx.executeSql(
      "SELECT * FROM potion;",
      [],
      (_, results) => {
        const rows = results.rows;
        const potions: Potion[] = [];

        for (let i = 0; i < rows.length; i++) {
          const item = rows.item(i);
          potions.push({
            id: item.id,
            name: item.name,
            eatingType: item.eatingType as Eating,
            time: item.time,
            bundleNum: item.bundleNum,
            Todo: item.Todo,
            ate: item.ate,
            totalNum: item.totalNum,
            eatingNum: item.eatingNum,
            restNum: item.restNum,
            description: item.description,
          });
        }

        onSuccess(potions);
      },
      (_, error) => {
        onError(error);
        return false;
      }
    );
  });
};

export const addPotion = (
  db: SQLite.SQLiteDatabase,
  potion: Omit<Potion, "id">,
  onSuccess: (id: string) => void,
  onError: (err: any) => void
) => {
  const id = uuid.v4().toString();

  db.transaction(
    tx => {
      tx.executeSql(
        `INSERT INTO potion 
         (id, name, eatingType, time, bundleNum, Todo, ate, totalNum, eatingNum, restNum, description)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          id,
          potion.name || "",
          potion.eatingType?.toString() || "",
          potion.time || "",
          potion.bundleNum ?? 0,
          potion.Todo ?? 0,
          potion.ate ?? 0,
          potion.totalNum ?? 0,
          potion.eatingNum ?? 0,
          potion.restNum ?? 0,
          potion.description || "",
        ],
        (_, results) => {
          onSuccess(id);
        },
        (_, error) => {
          onError(error);
          return false;
        }
      );
    },
    error => {
      onError(error);
    }
  );
};


// UPDATE
export const updatePotion = (
  db: SQLite.SQLiteDatabase,
  potion: Potion,
  onSuccess: () => void,
  onError: (err: any) => void
) => {
  const query = `
    UPDATE potion SET
      name = ?, 
      eatingType = ?, 
      time = ?, 
      bundleNum = ?, 
      Todo = ?, 
      ate = ?, 
      totalNum = ?, 
      eatingNum = ?, 
      restNum = ?, 
      description = ?
    WHERE id = ?;
  `;

  db.transaction(tx => {
    tx.executeSql(
      query,
      [
        potion.name,
        potion.eatingType.toString(),
        potion.time,
        potion.bundleNum,
        potion.Todo,
        potion.ate,
        potion.totalNum,
        potion.eatingNum,
        potion.restNum,
        potion.description,
        potion.id,
      ],
      () => {
        onSuccess();
      },
      (_, error) => {
        onError(error);
        return false;
      }
    );
  }, err => {
    onError(err);
  });
};

// DELETE (단일)
export const deletePotion = (
  db: SQLite.SQLiteDatabase,
  id: string,
  onSuccess: () => void,
  onError: (err: any) => void
) => {
  const query = "DELETE FROM potion WHERE id = ?;";

  db.transaction(tx => {
    tx.executeSql(
      query,
      [id],
      () => {
        onSuccess();
      },
      (_, error) => {
        onError(error);
        return false;
      }
    );
  }, err => {
    onError(err);
  });
};

// DELETE (전체)
export const deleteAllPotions = (
  db: SQLite.SQLiteDatabase,
  onSuccess: () => void,
  onError: (err: any) => void
) => {
  db.transaction(tx => {
    tx.executeSql(
      "DELETE FROM potion;",
      [],
      () => {
        onSuccess();
      },
      (_, error) => {
        onError(error);
        return false;
      }
    );
  }, err => {
    onError(err);
  });
};