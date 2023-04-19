import { createUser, login } from "../../controllers/userController";

const Mutation = {
  // User
  createUser: createUser,
  login: login,
};

export default Mutation;
