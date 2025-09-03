import { Potion, Eating } from "../models/Manager";
import uuid from "react-native-uuid";

export const generateRandomManagers = (): Potion[] => {
  const names = ["비타민C", "오메가3", "루테인", "홍삼", "유산균"];
  const descriptions = ["피로 회복", "눈 건강", "면역력", "혈액순환", "소화 개선"];

  const randomPotion = (): Potion => {
    const bundleNum = Math.floor(Math.random() * 50) + 10;
    const ate = Math.floor(Math.random() * bundleNum);
    return {
      id: String(uuid.v4()),
      name: names[Math.floor(Math.random() * names.length)],
      eatingType: Object.values(Eating)[
        Math.floor(Math.random() * Object.values(Eating).length)
      ] as Eating,
      time: new Date().toISOString(),
      bundleNum,
      Todo: 0,
      ate,
      totalNum: bundleNum,
      eatingNum: ate,
      restNum: bundleNum - ate,
      description: descriptions[Math.floor(Math.random() * descriptions.length)],
    };
  };

  return Array.from({ length: 10 }, () => randomPotion());
};