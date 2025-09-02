export type Potion = {
  id: string;
  name: string;
  type : string;
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
  Capsule = "Capsule",
  Gel = "Gel",
  Raw = "Raw",
  Drinking = "Drinking",
  Stick = "Stick",
  Sncak = "Sncak",
  Basket = "Basket",
}
