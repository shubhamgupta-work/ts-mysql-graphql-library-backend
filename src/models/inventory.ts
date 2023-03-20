import sequelize from "../database/dbInstance";
import { DataTypes } from "sequelize";

const Inventory = sequelize.define(
  "inventory",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
    author: {
      type: DataTypes.CHAR(100),
      allowNull: false,
    },
    issued: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "inventory" }
);

export default Inventory;
