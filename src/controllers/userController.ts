import User from "../models/user";
import { UserType } from "../types/requestType";
import catchAsync from "../utils/catchAsync";
import requiredFieldChecker from "../utils/requiredFieldChecker";
import jwt from "jsonwebtoken";

interface UserCreation {
  name: string;
  address: string;
  email: string;
  password: string;
  type?: UserType;
  phone: number;
}

const createReturnToken = (userId: number) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET!, {
    expiresIn: "30d",
  });

  return token;
};

export const createUser = catchAsync<
  any,
  { fields: UserCreation },
  { message: string }
>(async (parent, args) => {
  const {
    name,
    address,
    email,
    password,
    phone,
    type = "member",
  } = args.fields;
  requiredFieldChecker({ name, address, email, password }, "body");
  await User.create({ name, address, email, password, phone, type });
  return { message: "User Created" };
});

export const login = catchAsync<
  any,
  { email: string; password: string },
  { name: string; email: string; token: string }
>(async (parent, args) => {
  const { email, password } = args;

  requiredFieldChecker({ email, password }, "query");

  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("No user exist with this email");
  }

  const passwordIsCorrect = await user.comparePassword(password);
  if (!passwordIsCorrect) {
    throw new Error("Password is incorrect");
  }

  const token = createReturnToken(user.id!);
  return {
    name: user.name,
    email: user.email,
    token,
  };
});
