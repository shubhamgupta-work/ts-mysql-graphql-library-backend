import sequelize from "sequelize";
import Inventory from "../models/inventory";
import catchAsync from "../utils/catchAsync";
import { checkUserType, getUser } from "../utils/userValidation";
import { InventoryResponse } from "../types/inventoryTypes";

interface InventorySingle {
  name: string;
  author: string;
}

interface InventoryInput extends InventorySingle {
  quantity: number;
}

export const bulkCreateInventory = catchAsync<
  any,
  { data: Array<InventoryInput> },
  { message: string }
>(async (parent, { data }, { req }) => {
  await getUser(req);
  checkUserType(req, "staff");
  const array: InventorySingle[] = data
    .map((book) =>
      new Array(book.quantity).fill({
        name: book.name,
        author: book.author,
      })
    )
    .flat();

  await Inventory.bulkCreate(array);

  return { message: "All stock was updated" };
});

export const markAsNotIssueAble = catchAsync<
  any,
  { bookId: number },
  { message: string }
>(async (parent, { bookId }, { req }) => {
  await getUser(req);
  checkUserType(req, "staff");
  await Inventory.update({ issue_able: false }, { where: { id: bookId } });
  return { message: "The book has been marked as non issueable" };
});

export const getInventoryList = catchAsync<
  any,
  { includeNonIssueable?: boolean; onlyNonIssueAble?: boolean },
  InventoryResponse[]
>(
  async (
    parent,
    { includeNonIssueable = false, onlyNonIssueAble = false },
    { req }
  ) => {
    await getUser(req);
    checkUserType(req, "staff");

    let filter = {};
    filter = { issue_able: true };
    if (includeNonIssueable) {
      filter = {};
    }
    if (onlyNonIssueAble) {
      filter = { issue_able: false };
    }

    const inventory = await Inventory.findAll({
      attributes: [
        "name",
        "author",
        [sequelize.fn("COUNT", sequelize.col("*")), "quantity"],
      ],
      where: filter,
      group: ["name", "author"],
      raw: true,
    });

    return inventory;
  }
);

export const getCatalogue = catchAsync<any, any, InventoryResponse[]>(
  async () => {
    const inventory = await Inventory.findAll({
      attributes: ["name", "author"],
      where: { issue_able: true },
      group: ["name", "author"],
      raw: true,
    });

    return inventory;
  }
);
