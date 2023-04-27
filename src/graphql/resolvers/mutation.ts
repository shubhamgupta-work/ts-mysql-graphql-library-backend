import { createUser, login } from "../../controllers/userController";
import {
  bulkCreateInventory,
  markAsNotIssueAble,
} from "../../controllers/inventoryController";
import { issueBook, returnBook } from "../../controllers/issueController";

const Mutation = {
  // User
  createUser: createUser,
  login: login,

  //Inventory
  createBulkInventory: bulkCreateInventory,
  markAsNotIssueAble,

  //Issue
  issueBook,
  returnBook,
};

export default Mutation;
