import sequelize from "../database/dbInstance";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import moment from "moment";

interface InventoryModel
  extends Model<
    InferAttributes<InventoryModel>,
    InferCreationAttributes<InventoryModel>
  > {
  id?: number;
  book: number;
  user: number;
  issued_on?: Date;
  issued_upto?: Date;
  issue_active?: boolean;
}

const Issue = sequelize.define<InventoryModel>(
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
          new Date(
            moment(this.getDataValue("issued_on"))!
              .add(14, "days")
              .format("YYYY-MM-DD")
          )
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
