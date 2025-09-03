import SQLite from "react-native-sqlite-storage";
import uuid from "react-native-uuid";
import {Eating, Potion} from "../models/Manager"

SQLite.enablePromise(true);

export const getDBConnection = async () => {
  return SQLite.openDatabase({ name: "potion.db", location: "default" });
};

export const createPotionTable = async (db: SQLite.SQLiteDatabase) => {
  const query = `
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
  `;
  await db.executeSql(query);
};

// CREATE
export const addPotion = async (
  db: SQLite.SQLiteDatabase,
  potion: Omit<Potion, "id">
) => {
  const id = uuid.v4().toString();
  const query = `
    INSERT INTO potion 
    (id, name, eatingType, time, bundleNum, Todo, ate, totalNum, eatingNum, restNum, description)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;
  await db.executeSql(query, [
    id,
    potion.name,
    potion.eatingType,
    potion.time,
    potion.bundleNum,
    potion.Todo,
    potion.ate,
    potion.totalNum,
    potion.eatingNum,
    potion.restNum,
    potion.description,
  ]);
  return id;
};

// READ
export const getPotions = async (db: SQLite.SQLiteDatabase): Promise<Potion[]> => {
  const results = await db.executeSql("SELECT * FROM potion;");
  const rows = results[0].rows;
  const potions: Potion[] = [];

  for (let i = 0; i < rows.length; i++) {
    const item = rows.item(i);
    potions.push({
      id: item.id,
      name: item.name,
      eatingType: item.eatingType as Eating, // 문자열 → enum 캐스팅
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
  return potions;
};
// UPDATE
export const updatePotion = async (
  db: SQLite.SQLiteDatabase,
  potion: Potion
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
  await db.executeSql(query, [
    potion.name,
    potion.eatingType.toString(), // enum → string 저장
    potion.time,
    potion.bundleNum,
    potion.Todo,
    potion.ate,
    potion.totalNum,
    potion.eatingNum,
    potion.restNum,
    potion.description,
    potion.id,
  ]);
};

// DELETE (단일)
export const deletePotion = async (db: SQLite.SQLiteDatabase, id: string) => {
  const query = "DELETE FROM potion WHERE id = ?;";
  await db.executeSql(query, [id]);
};

// DELETE (전체)
export const deleteAllPotions = async (db: SQLite.SQLiteDatabase) => {
  await db.executeSql("DELETE FROM potion;");
};