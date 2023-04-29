import { createUser, login } from "../../controllers/userController";
import {
  bulkCreateInventory,
  markAsNotIssueAble,
} from "../../controllers/inventoryController";
import { issueBook, returnBook } from "../../controllers/issueController";
import "../../controllers/lateFeesController";
import { markAsPaid } from "../../controllers/lateFeesController";

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

  //LateFees
  markAsPaid: markAsPaid,
};

export default Mutation;
