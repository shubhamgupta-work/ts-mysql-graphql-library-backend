import cron from "node-cron";
import Issue from "../models/issue";
import sequelize from "sequelize";
import { Op } from "sequelize";
import LateFees from "../models/lateFees";

const writeLateFees = async () => {
  try {
    console.log("Cron job started for late fees");

    const sequelizeFunction = sequelize.fn(
      "timediff",
      sequelize.fn("NOW"),
      sequelize.col("issued_upto")
    );

    const sequelizeFunString = "TIMEDIFF(NOW(), issued_upto)";

    const totalDaysCalculator = `CEIL(HOUR(${sequelizeFunString})/24 + MINUTE(${sequelizeFunString})/(24*60) + SECOND(${sequelizeFunString})/(24*60*60))`;

    const overdueIssues = (await Issue.findAll({
      attributes: [
        // [sequelizeFunction, "overdueTIME"],
        // [sequelize.literal(`HOUR(${sequelizeFunString})/24`), "overdueHOUR"],
        // [
        //   sequelize.literal(`MINUTE(${sequelizeFunString})/(24*60)`),
        //   "overdueMINUTE",
        // ],
        // [
        //   sequelize.literal(`SECOND(${sequelizeFunString})/(24*60*60)`),
        //   "overdueSECOND",
        // ],
        [sequelize.literal(totalDaysCalculator), "totalDays"],
        [sequelize.literal(`${totalDaysCalculator} * 5`), "latefees"],

        ["id", "issue"],
      ],
      where: [
        sequelize.where(sequelizeFunction, { [Op.gt]: 0 }),
        { issue_active: true },
      ],
      raw: true,
    })) as unknown as { totalDays: number; latefees: number; issue: number }[];

    console.log({ overdueIssues });

    await Promise.all(
      overdueIssues.map(async ({ totalDays, ...rest }) => {
        await LateFees.upsert(rest);
      })
    );
    console.log("Late fees updated");
  } catch (err) {
    console.log(err);
  }
};

cron.schedule("0 0 * * *", writeLateFees, {
  timezone: "Asia/KolKata",
  scheduled: true,
});
