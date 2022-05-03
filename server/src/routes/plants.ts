import express from "express";
const db = require("../db");
import sanitizeHtml from "sanitize-html";

const plantsRouter: express.Router = express.Router();

type plant = {
  plantId: Number;
  insertDate: Date;
  lastEditDate: Date;
  name: String;
  waterIntervalDays: Number;
  lastWater: Date;
  waterDeadline: Date;
  nutrIntervalDays: Number;
  lastNutr: Date;
  nutrDeadline: Date;
  soilIntervalMonths: Number;
  lastSoil: Date;
  soilDeadline: Date;
  info: String;
};

plantsRouter.get("/", async (_req: express.Request, res: express.Response) => {
  try {
    const queryResult = await db.query("SELECT * FROM plants");
    const plants = queryResult.rows.map((result: any) => {
      return {
        plantId: result.plant_id,
        insertDate: result.insert_date,
        lastEditDate: result.last_edit_date,
        name: result.name,
        waterIntervalDays: result.water_interval_days,
        lastWater: result.last_water,
        waterDeadline: result.water_deadline,
        nutrIntervalDays: result.nutr_interval_days,
        lastNutr: result.last_nutr,
        nutrDeadline: result.nutr_deadline,
        soilIntervalMonths: result.soil_interval_months,
        lastSoil: result.last_soil,
        soilDeadline: result.soil_deadline,
        info: result.info,
      };
    });

    console.log(plants);

    res.json(plants);
  } catch (e: any) {
    res.status(500).json({ virhe: "Tapahtui virhe." });
  }
});

plantsRouter.delete(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      // const queryResult = await db.query("DELETE FROM plants WHERE plantId=$1", [req.body.id]);
      console.log(req.body.id);
      console.log("jotain");
      res.json({});
    } catch (e: any) {
      res.status(500).json({ virhe: "Tapahtui virhe." });
    }
  }
);

export default plantsRouter;
