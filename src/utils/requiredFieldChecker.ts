import { ApolloServerErrorCode } from "@apollo/server/errors";
import { GraphQLError } from "graphql";

const requiredFieldChecker = (
  obj: { [key: string]: any },
  closure: "body" | "query"
): void => {
  const keys = Object.keys(obj);
  const emptyValues = [];
  for (let key of keys) {
    if (typeof obj[key] !== "boolean" && !obj[key]) {
      emptyValues.push(key);
    }
  }

  if (emptyValues.length) {
    const errString =
      emptyValues.join(", ") + " value(s) are required in " + closure;

    throw new GraphQLError(errString, {
      extensions: { code: ApolloServerErrorCode.BAD_USER_INPUT },
    });
  }
};

export default requiredFieldChecker;
