import { Request } from "express";
import globalErrorHandler from "./globalErrorHandler";
import { ReqWithUser } from "../types/requestType";

const catchAsync =
  <T, U, V>(
    fn: (
      parent: T,
      args: U,
      context: { req: ReqWithUser },
      info?: any
    ) => Promise<V>
  ) =>
  (parent: T, args: U, context: { req: Request }, info?: any) => {
    return fn(parent, args, context, info).catch(globalErrorHandler);
  };

export default catchAsync;
