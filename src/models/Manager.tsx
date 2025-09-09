export type Potion = {
  id: string;
  name: string;
  eatingType : Eating;
  time: string;
  bundleNum: number;
  Todo:number;
  ate : number;
  totalNum: number;
  eatingNum: number;
  restNum : number;
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
