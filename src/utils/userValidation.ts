import { GraphQLError } from "graphql";
import { promisify } from "util";
import jwt, { Secret } from "jsonwebtoken";
import User from "../models/user";
import { ReqWithUser } from "../types/requestType";

export const getuser = async (req: ReqWithUser) => {
  try {
    const token = req.headers.token as string;
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
