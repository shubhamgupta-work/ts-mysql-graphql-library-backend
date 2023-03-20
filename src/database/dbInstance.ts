import { Sequelize, Options } from "sequelize";

const config: Options = {
  username: process.env.DB_USERNAME ?? "",
  password: process.env.DB_PASSWORD ?? "",
  database: process.env.DB_NAME ?? "",
  host: process.env.DB_HOST ?? "",
  dialect: "mysql",
};

const sequelize = new Sequelize(
  config.database || "",
  config.username || "",
  config.password,
  config
);

export default sequelize;
