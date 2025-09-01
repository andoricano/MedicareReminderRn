import Realm from "realm";
import { ManagerSchema, PotionSchema, CheckSchema } from "./schemas";

export const realm = new Realm({
  schema: [ManagerSchema, PotionSchema, CheckSchema],
  schemaVersion: 1,
});