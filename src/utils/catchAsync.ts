import { Request } from "express";
import globalErrorHandler from "./globalErrorHandler";

const catchAsync =
  <T, U, V>(
    fn: (
      parent: T,
      args: U,
      context: { req: Request },
      info?: any
    ) => Promise<V>
  ) =>
  (parent: T, args: U, context: { req: Request }, info?: any) => {
    return fn(parent, args, context, info).catch(globalErrorHandler);
  };

// const catchAsync =
//   <T, U, V>(
//     fn: (parent: T, args: U, context: { req: Request }, info: any) => Promise<V>
//   ): Function =>
//   (parent: T, args: U, context: { req: Request }, info: any) => {
//     fn(parent, args, context, info).catch(globalErrorHandler);
//   };

export default catchAsync;
