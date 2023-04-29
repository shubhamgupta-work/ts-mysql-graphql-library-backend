import {
  getCatalogue,
  getInventoryList,
} from "../../controllers/inventoryController";
import {
  getAllIssued,
  getExtremeBook,
} from "../../controllers/issueController";
import { getLateFeesOfUsers } from "../../controllers/lateFeesController";

const Query = {
  //Inventory
  getAllInventory: getInventoryList,
  getCatalogue: getCatalogue,

  //Issue
  getAllIssued: getAllIssued,
  getExtremeBook: getExtremeBook,

  //LateFees
  getLateFeesOfUsers: getLateFeesOfUsers,
};

export default Query;
