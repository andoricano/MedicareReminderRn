import { Potion } from "../models/Manager";

export type NaviStackList = {
  Home: undefined;
  Detail: undefined;
  History: undefined;
  AlarmList: undefined;
  AddPotion: undefined;
  AddAlarm: {
    potion : Potion
  };
};