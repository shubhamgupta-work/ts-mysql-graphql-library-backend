import { GraphQLError } from "graphql";
import { promisify } from "util";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/user";
import { ReqWithUser, UserType } from "../types/requestType";

export const getUser = async (req: ReqWithUser) => {
  try {
    const token = req.headers.authorization as string;
    if (!token) {
      throw new GraphQLError("No token found", { extensions: { code: 401 } });
    }
    const actualToken = token.replace("Bearer ", "");

    const result = await promisify<string, Secret, {}, { userId: number }>(
      jwt.verify
    )(actualToken, process.env.JWT_SECRET!, {});

    const user = await User.findByPk(result.userId);

    if (!user) {
      throw new GraphQLError("User not found", { extensions: { code: 400 } });
    }
    req.user = user;
  } catch (err) {
    throw err;
  }
};

export const checkUserType = async (req: ReqWithUser, type: UserType) => {
  try {
    const userType = req.user?.type;
    if (userType !== type) {
      throw new GraphQLError("You are not authorized for this action", {
        extensions: { code: 401 },
      });
    }
  } catch (err) {
    throw err;
  }
};
