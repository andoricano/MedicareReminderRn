import { Manager, Potion, Eating } from "../models/Manager";
import { v4 as uuidv4 } from 'uuid';

export const generateRandomManagers = (): Manager[] => {
  const names = ["비타민C", "오메가3", "루테인", "홍삼", "유산균"];
  const descriptions = ["피로 회복", "눈 건강", "면역력", "혈액순환", "소화 개선"];

  const randomPotion = (): Potion => ({
    name: names[Math.floor(Math.random() * names.length)],
    type: Object.values(Eating)[Math.floor(Math.random() * Object.values(Eating).length)] as Eating,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    bundleNum: Math.floor(Math.random() * 50) + 10,
    Todo: 0,
  });

  const randomManager = (): Manager => {
    const potion = randomPotion();
    const total = potion.bundleNum;
    const eaten = Math.floor(Math.random() * total);
    return {
      id: uuidv4(),
      type: potion,
      totalNum: total,
      eatingNum: eaten,
      restNum: total - eaten,
      alarm: [],
      cycle: [],
    };
  };

  return Array.from({ length: 10 }, () => randomManager());
};
