import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import sequelize from "../database/dbInstance";
import Issue from "./issue";

export interface LateFeesModel
  extends Model<
    InferAttributes<LateFeesModel>,
    InferCreationAttributes<LateFeesModel>
  > {
  id?: number;
  issue: number;
  latefees: number;
  paid?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const LateFees = sequelize.define<LateFeesModel>(
  "latefees",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false,
    },
    issue: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    latefees: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    paid: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    tableName: "latefee",
    timestamps: true,
    indexes: [{ unique: true, fields: ["issue"] }],
  }
);

LateFees.belongsTo(Issue, { foreignKey: "issue", as: "Issue" });
Issue.hasOne(LateFees);

export default LateFees;
