import Inventory from "../models/inventory";
import catchAsync from "../utils/catchAsync";
import { checkUserType, getUser } from "../utils/userValidation";

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
