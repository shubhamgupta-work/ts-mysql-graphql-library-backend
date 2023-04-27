import { InventoryModel } from "../models/inventory";
import { IssueModel } from "../models/issue";
import { UserModel } from "../models/user";

export interface IssueJoin extends IssueModel {
  User: UserModel;
  Book: InventoryModel;
}

export type ExtremeBookType = "mostissued" | "leastissued";
