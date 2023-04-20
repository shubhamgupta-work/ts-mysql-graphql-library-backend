import { createUser, login } from "../../controllers/userController";
import { bulkCreateInventory } from "../../controllers/inventoryController";

const Mutation = {
  // User
  createUser: createUser,
  login: login,

  //Inventory
  createBulkInventory: bulkCreateInventory,
};

export default Mutation;
