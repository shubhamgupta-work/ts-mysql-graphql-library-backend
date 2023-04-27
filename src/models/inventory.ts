import sequelize from "../database/dbInstance";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import Issue from "./issue";

export interface InventoryModel
  extends Model<
    InferAttributes<InventoryModel>,
    InferCreationAttributes<InventoryModel>
  > {
  id?: number;
  name: string;
  author: string;
  issue_able?: boolean;
  issued?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const Inventory = sequelize.define<InventoryModel>(
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
    issue_able: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
      allowNull: false,
    },
  },
  { timestamps: true, tableName: "inventory" }
);

export default Inventory;
