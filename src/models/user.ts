import sequelize from "../database/dbInstance";
import {
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from "sequelize";
import bcrypt from "bcryptjs";
import Issue from "./issue";

export interface UserModel
  extends Model<
    InferAttributes<UserModel>,
    InferCreationAttributes<UserModel>
  > {
  id?: number;
  name: string;
  email: string;
  address: string;
  password: string;
  phone: number;
  type?: "member" | "staff";
  createdAt?: Date;
  updateAt?: Date;
  comparePassword: (a: string) => Promise<boolean>;
}

const User = sequelize.define<UserModel>(
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
    phone: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 9999999999,
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
    },
    type: {
      type: DataTypes.ENUM("member", "staff"),
      defaultValue: "member",
      allowNull: false,
    },
  },
  {
    timestamps: true,
    tableName: "user",
    indexes: [{ unique: true, fields: ["email"] }],
    hooks: {
      beforeCreate: async function (user) {
        if ("password" in user) {
          if (user.changed("password")) {
            const hashedPassword = await bcrypt.hash(
              user.get("password") as string,
              12
            );
            user.set("password", hashedPassword);
          }
        }
      },
      beforeUpdate: async function (user) {
        //.changes is a sequelize method to check if a field has changed
        if ("password" in user && user.changed("password")) {
          const hashedPassword = await bcrypt.hash(
            user.get("password") as string,
            12
          );
          user.set("password", hashedPassword);
        }
      },
    },
  }
);

User.prototype.comparePassword = async function (password: string) {
  const isCorrectPassword = await bcrypt.compare(password, this!.password);
  return isCorrectPassword;
};

export default User;
