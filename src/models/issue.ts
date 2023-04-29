import sequelize from "../database/dbInstance";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import Inventory from "./inventory";
import User from "./user";

export interface IssueModel
  extends Model<
    InferAttributes<IssueModel>,
    InferCreationAttributes<IssueModel>
  > {
  id?: number;
  book: number;
  user: number;
  issued_on?: Date;
  issued_upto?: Date;
  issue_active?: boolean;
}

const Issue = sequelize.define<IssueModel>(
  "issue",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    book: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    issued_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    issued_upto: {
      type: DataTypes.DATE,
    },
    issue_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "issue",
    hooks: {
      afterCreate: async (issue) => {
        const bookId = issue.getDataValue("book");
        await Inventory.update({ issued: true }, { where: { id: bookId } });
      },
      afterUpdate: async (issue) => {
        const issue_active = issue.getDataValue("issue_active");
        if (issue.changed("issue_active") && !issue_active) {
          const bookId = issue.getDataValue("book");
          await Inventory.update({ issued: false }, { where: { id: bookId } });
        }
      },
    },
  }
);

Issue.belongsTo(User, { foreignKey: "user", as: "User" });
User.hasMany(Issue);
Issue.belongsTo(Inventory, { foreignKey: "book", as: "Book" });
Inventory.hasMany(Issue);

export default Issue;
