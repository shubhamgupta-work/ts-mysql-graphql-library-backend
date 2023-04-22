import { createUser, login } from "../../controllers/userController";
import { bulkCreateInventory } from "../../controllers/inventoryController";
import { issueBook, returnBook } from "../../controllers/issueController";

const Mutation = {
  // User
  createUser: createUser,
  login: login,

  //Inventory
  createBulkInventory: bulkCreateInventory,

  //Issue
  issueBook,
  returnBook,
};

export default Mutation;
