import User from "../../models/user";
import catchAsync from "../../utils/catchAsync";
import requiredFieldChecker from "../../utils/requiredFieldChecker";

interface UserInput {
  name: string;
  address: string;
  email: string;
  password: string;
}

const Mutation = {
  createUser: catchAsync<any, { fields: UserInput }, { message: string }>(
    async (parent: any, args: { fields: UserInput }) => {
      const { name, address, email, password } = args.fields;
      requiredFieldChecker({ name, address, email, password }, "body");
      await User.create({ name, address, email, password });
      return { message: "User Created" };
    }
  ),
};

export default Mutation;
