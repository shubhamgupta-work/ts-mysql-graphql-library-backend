import dotenv from "dotenv";
dotenv.config();
import app from "./app";
import sequelize from "./database/dbInstance";
import "./models/index";

const port: number = Number(process.env.PORT) || 9000;

sequelize
  .sync({ force: false, alter: true })
  .then(() => {
    console.log("All models were synced successfully");
    app.listen(port, function () {
      console.log(`Server Started on port ${port}`);
    });
  })
  .catch((err: Error) => console.log("Error syncing the models", err));
