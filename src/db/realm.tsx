import Realm from "realm";
import { ManagerSchema, PotionSchema, CheckSchema } from "./schemas";

// Realm 초기화
export const realm = new Realm({
  schema: [ManagerSchema, PotionSchema, CheckSchema],
  schemaVersion: 1,
});