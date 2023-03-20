import sequelize from "../database/dbInstance";
import { DataTypes } from "sequelize";
import bcrypt from "bcryptjs";

const User = sequelize.define(
  "user",
  {
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.CHAR(100),
      allowNull: true,
    },
    address: {
      type: DataTypes.CHAR(255),
      allowNull: false,
    },
    email: {
      type: DataTypes.CHAR(50),
      allowNull: false,
    },
    password: {
      type: DataTypes.CHAR(100),
      allowNull: false,
      set(value: string) {
        this.setDataValue("password", async function () {
          const hashedPassword = await bcrypt.hash(value, 12);
          return hashedPassword;
        });
      },
    },
  },
  { timestamps: true, tableName: "user" }
);

export default User;
