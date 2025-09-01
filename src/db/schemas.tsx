export const PotionSchema = {
  name: "Potion",
  properties: {
    name: "string",
    type: "string",
    description: "string",
    bundleNum: "int",
    todo: "int",
  },
};

export const CheckSchema = {
  name: "Check",
  properties: {
    ate: "int",
    time: "date",
  },
};

export const ManagerSchema = {
  name: "Manager",
  properties: {
    type: "Potion",
    totalNum: "int",
    eatingNum: "int",
    restNum: "int",
    alarm: "Check[]",
    cycle: "date[]",
  },
};