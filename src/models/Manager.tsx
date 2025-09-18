export type Potion = {
  id: string;
  name: string;
  eatingType: Eating;
  times: string[];
  bundleNum: number;
  Todo: number;
  ate: string[];
  totalNum: number;
  eatingNum: number;
  restNum: number;
  description: String;
}

export enum Eating {
  None = "None",
  Eating = "Eating",
  Capsule = "Capsule",
  Gel = "Gel",
  Raw = "Raw",
  Drinking = "Drinking",
  Stick = "Stick",
  Sncak = "Sncak",
  Basket = "Basket",
}
