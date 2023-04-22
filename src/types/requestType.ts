import { Request } from "express";
import { UserModel } from "../models/user";

export interface ReqWithUser extends Request {
  user?: UserModel;
}

export type UserType = "member" | "staff";
