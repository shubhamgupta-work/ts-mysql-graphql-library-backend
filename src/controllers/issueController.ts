import { GraphQLError } from "graphql";
import Inventory from "../models/inventory";
import catchAsync from "../utils/catchAsync";
import Issue from "../models/issue";
import { checkUserType, getUser } from "../utils/userValidation";
import User from "../models/user";

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

  const user = await User.findByPk(args.userId);

  if (!user) {
    throw new GraphQLError("Can't find the user", {
      extensions: { code: 400 },
    });
  }

  await Issue.create({ book: args.bookId, user: args.userId });

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
