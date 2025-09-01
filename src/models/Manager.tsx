export type Manager = {
  id: string;
  type : Potion;
  totalNum: number;
  eatingNum: number;
  restNum : number;
  alarm: Check[];
  cycle: Date[];
}

export type Check = {
  ate : number;
  time: Date;
}

export type Potion = {
  name: string;
  type : Eating;
  description: String;
  bundleNum: number;
  Todo:number;
}
export enum Eating {
  None = "None",
  Capsule = "Capsule",
  Gel = "Gel",
  Raw = "Raw",
  Drinking = "Drinking",
  Stick = "Stick",
  Sncak = "Sncak",
  Basket = "Basket",
}
