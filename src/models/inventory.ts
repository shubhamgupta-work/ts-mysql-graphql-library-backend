import sequelize from "../database/dbInstance";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";

export interface InventoryModel
  extends Model<
    InferAttributes<InventoryModel>,
    InferCreationAttributes<InventoryModel>
  > {
  id?: number;
  name: string;
  author: string;
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
  },
  { timestamps: true, tableName: "inventory" }
);

export default Inventory;
