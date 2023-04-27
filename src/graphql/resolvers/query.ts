import {
  getCatalogue,
  getInventoryList,
} from "../../controllers/inventoryController";
import {
  getAllIssued,
  getExtremeBook,
} from "../../controllers/issueController";

const Query = {
  //Inventory
  getAllInventory: getInventoryList,
  getCatalogue: getCatalogue,

  //Issue
  getAllIssued: getAllIssued,
  getExtremeBook: getExtremeBook,
};

export default Query;
