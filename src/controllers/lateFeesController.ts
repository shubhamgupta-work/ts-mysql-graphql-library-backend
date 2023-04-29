import sequelize from "sequelize";
import Inventory from "../models/inventory";
import Issue from "../models/issue";
import LateFees from "../models/lateFees";
import User from "../models/user";
import catchAsync from "../utils/catchAsync";
import { GraphQLError } from "graphql";

//All the data, only unpaid ones, only paid one, of a specific

interface LateFeesReturnType {
  UserId: number;
  Email: string;
  Name: string;
  Phone: number;
  Address: string;
  LateFees: number;
  Paid: number;
  TotalLateFees: number;
  Book: string;
  IssuedOn: string;
  IssuedUpto: string;
}

type LateFeesDataType = "all" | "unpaid" | "paid";

export const getLateFeesOfUsers = catchAsync<
  any,
  { type: LateFeesDataType; user: number },
  LateFeesReturnType[]
>(async (parent, { type, user }) => {
  let where = {};
  if (type === "unpaid") {
    where = { ...where, paid: false };
  }
  if (type === "paid") {
    where = { ...where, paid: true };
  }
  if (user) {
    where = { ...where, "$Issue.user.id$": user };
  }

  const results = (await LateFees.findAll({
    // where: sequelize.where(sequelize.col("Issue.User.email"), email),
    where,
    attributes: [
      [sequelize.col("Issue.User.id"), "UserId"],
      [sequelize.col("Issue.User.email"), "Email"],
      [sequelize.col("Issue.User.name"), "Name"],
      [sequelize.col("Issue.User.phone"), "Phone"],
      [sequelize.col("Issue.User.address"), "Address"],
      [sequelize.col("Issue.Book.name"), "Book"],
      [sequelize.col("Issue.issued_on"), "IssuedOn"],
      [sequelize.col("Issue.issued_upto"), "IssuedUpto"],
      [sequelize.col("latefees"), "LateFees"],
      [sequelize.col("paid"), "Paid"],
      [sequelize.literal("SUM(latefees) OVER()"), "TotalLateFees"],
    ],
    include: {
      model: Issue,
      as: "Issue",
      attributes: [],
      include: [
        {
          model: User,
          as: "User",
          attributes: [],
        },
        { model: Inventory, as: "Book", attributes: [] },
      ],
    },
    // group: [sequelize.col("Issue.User.email")],
    // raw: true,
    // order: [["paid", "DESC"]],
  })) as unknown as LateFeesReturnType[];
  const data = JSON.parse(JSON.stringify(results));
  return data;
});

export const markAsPaid = catchAsync<
  any,
  { lateFeesId: number },
  { message: string }
>(async (parent, { lateFeesId }) => {
  const entry = await LateFees.findByPk(lateFeesId);

  if (!entry) {
    throw new GraphQLError("Invalid ID passed", { extensions: { code: 400 } });
  }

  if (entry?.paid) {
    throw new GraphQLError("The fine has been already paid.", {
      extensions: { code: 400 },
    });
  }

  await LateFees.update({ paid: true }, { where: { id: lateFeesId } });

  return { message: "Late Fees Paid" };
});
