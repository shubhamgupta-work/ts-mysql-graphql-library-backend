import sequelize from "../database/dbInstance";
import { DataTypes } from "sequelize";
import moment from "moment";

const Issue = sequelize.define(
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
      references: {
        model: "Inventory",
        key: "id",
      },
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "User",
        key: "id",
      },
    },
    issued_on: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    issued_upto: {
      type: DataTypes.DATE,
      set() {
        this.setDataValue(
          "issued_upto",
          moment(this.getDataValue("issued_on").add(14, "days"))
        );
      },
    },
    issue_active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "issue" }
);

export default Issue;
