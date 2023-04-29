import { GraphQLError } from "graphql";
import Inventory from "../models/inventory";
import catchAsync from "../utils/catchAsync";
import Issue from "../models/issue";
import { checkUserType, getUser } from "../utils/userValidation";
import User from "../models/user";
import moment from "moment";
import { ExtremeBookType, IssueJoin } from "../types/issueTypes";
import { Op } from "sequelize";
import sequelize from "sequelize";

export const issueBook = catchAsync<
  any,
  { bookId: number; userId: number },
  { message: string }
>(async (parent, args, { req }) => {
  await getUser(req);
  checkUserType(req, "staff");

  const book = await Inventory.findByPk(args.bookId);

  if (!book) {
    throw new GraphQLError("No book found", { extensions: { code: 400 } });
  }

  if (!book.issue_able) {
    return new GraphQLError("This book is not issueable", {
      extensions: { code: 400 },
    });
  }
  if (book.issued) {
    return new GraphQLError("This book is already issued", {
      extensions: { code: 400 },
    });
  }

  const user = await User.findByPk(args.userId);

  if (!user) {
    throw new GraphQLError("Can't find the user", {
      extensions: { code: 400 },
    });
  }

  await Issue.create({
    book: args.bookId,
    user: args.userId,
    issued_upto: new Date(
      moment().add(14, "days").endOf("day").format("YYYY-MM-DDTHH:mm:ss")
    ),
  });

  return { message: "Book Issued" };
});

export const returnBook = catchAsync<
  any,
  { bookId: number; userId: number },
  { message: string }
>(async (parent, args, { req }) => {
  await getUser(req);
  checkUserType(req, "staff");

  const issued = await Issue.findOne({
    where: { book: args.bookId, user: args.userId },
    order: [["createdAt", "DESC"]],
  });

  if (!issued) {
    throw new GraphQLError("Book is not issued to this user.", {
      extensions: { code: 400 },
    });
  }

  if (!issued.issue_active) {
    throw new GraphQLError("Book is already returned", {
      extensions: { code: 400 },
    });
  }

  await Issue.update(
    { issue_active: false, issued_upto: new Date() },
    { where: { id: issued.id }, individualHooks: true }
  );

  return { message: "Book Return successfully" };
});

export const getAllIssued = catchAsync<
  any,
  { includeReturned: boolean; userEmail?: string; bookName?: string },
  any[]
>(async (parent, { includeReturned, userEmail, bookName }) => {
  let where = {};

  if (!includeReturned) {
    where = { ...where, issue_active: true };
  }

  if (userEmail) {
    where = { ...where, "$User.email$": { [Op.substring]: userEmail } };
  }

  if (bookName) {
    where = { ...where, "$Book.name$": { [Op.substring]: bookName } };
  }

  const issued = (await Issue.findAll({
    include: [
      { model: User, as: "User", attributes: { exclude: ["password"] } },
      { model: Inventory, as: "Book" },
    ],
    where,
  })) as IssueJoin[];

  const data = JSON.parse(JSON.stringify(issued)).map((el: IssueJoin) => ({
    ...el,
    user: el.User,
    book: el.Book,
  }));

  return data;
});

export const getExtremeBook = catchAsync<
  any,
  { type: ExtremeBookType },
  { name: string; total: number }[]
>(async (parent, { type }) => {
  let obj = {};

  if (type === "leastissued") {
    obj = { limit: 1, order: [["total", "ASC"]] };
  }

  if (type === "mostissued") {
    obj = { limit: 1, order: [["total", "DESC"]] };
  }

  const book = await Issue.findAll({
    attributes: [
      [sequelize.col("Book.name"), "name"],
      [sequelize.fn("COUNT", "name"), "total"],
    ],
    include: [{ model: Inventory, as: "Book", attributes: [] }],
    group: sequelize.col("name"),
    order: [["total", "ASC"]],
    ...obj,
  });

  const data = JSON.parse(JSON.stringify(book));
  return data;
});
