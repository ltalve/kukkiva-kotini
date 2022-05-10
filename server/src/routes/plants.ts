import express from "express";
const db = require("../db");

const plantsRouter: express.Router = express.Router();

type Plant = {
  plantId: number;
  createdAt: string;
  updatedAt: string;
  plantName: string;
  waterIntervalDays: number;
  lastWater: string;
  waterDeadline: string;
  nutrIntervalDays: number;
  lastNutr: string;
  nutrDeadline: string;
  soilIntervalMonths: number;
  lastSoil: string;
  soilDeadline: string;
  info: string;
};

type PlantInDb = {
  plant_id: number;
  created_at: string;
  updated_at: string;
  plant_name: string;
  water_interval_days: number;
  last_water: string;
  water_deadline: string;
  nutr_interval_days: number;
  last_nutr: string;
  nutr_deadline: string;
  soil_interval_months: number;
  last_soil: string;
  soil_deadline: string;
  info: string;
};

type NewPlant = Omit<Plant, "plantId" | "createdAt" | "updatedAt">;

plantsRouter.get("/", async (_req: express.Request, res: express.Response) => {
  try {
    const queryResult = await db.query("SELECT * FROM plants");
    const plants = queryResult.rows.map((result: any) => {
      const plant: Plant = {
        plantId: result.plant_id,
        createdAt: result.created_at,
        updatedAt: result.updated_at,
        plantName: result.plant_name,
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
      return plant;
    });

    res.json(plants);
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ virhe: "Tapahtui virhe." });
  }
});

plantsRouter.post("/", async (req: express.Request, res: express.Response) => {
  try {
    const newPlant: NewPlant = {
      plantName: req.body.plantName,
      waterIntervalDays: req.body.waterIntervalDays,
      lastWater: req.body.lastWater ?? null,
      waterDeadline: req.body.waterDeadline ?? null,
      nutrIntervalDays: req.body.nutrIntervalDays ?? null,
      lastNutr: req.body.lastNutr ?? null,
      nutrDeadline: req.body.nutrDeadline ?? null,
      soilIntervalMonths: req.body.soilIntervalMonths ?? null,
      lastSoil: req.body.lastSoil ?? null,
      soilDeadline: req.body.soilDeadline ?? null,
      info: req.body.info ?? null,
    };

    if (await plantNameExists(newPlant.plantName)) {
      res.status(400).send("Kasvin nimi on jo tietokannassa.");
      return;
    }

    console.log("adding new plant: " + newPlant.plantName);
    console.log(JSON.stringify(req.body));

    const queryResult = await db.query(
      "INSERT INTO plants (plant_name, water_interval_days, last_water, water_deadline, nutr_interval_days," +
        "last_nutr, nutr_deadline, soil_interval_months, last_soil, soil_deadline, info)" +
        "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)",
      [
        newPlant.plantName,
        newPlant.waterIntervalDays,
        newPlant.lastWater,
        newPlant.waterDeadline,
        newPlant.nutrIntervalDays,
        newPlant.lastNutr,
        newPlant.nutrDeadline,
        newPlant.soilIntervalMonths,
        newPlant.lastSoil,
        newPlant.soilDeadline,
        newPlant.info,
      ]
    );
    if (queryResult.rowCount === 0) {
      res.status(400).send({ error: "Lisäys ei onnistunut." });
    } else {
      res.json({ success: "Lisäys onnistui." });
    }
    console.log(JSON.stringify(queryResult));
  } catch (e: any) {
    console.log(e);
    res.status(500).json({ error: "Tapahtui virhe." });
  }
});

plantsRouter.delete(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const queryResult = await db.query(
        "DELETE FROM plants WHERE plant_id=$1",
        [req.params.id]
      );
      if (queryResult.rowCount === 0) {
        res
          .status(404)
          .send({ error: "Poistettavaa kasvia ei ole tietokannassa." });
      } else {
        res.json({ success: "Poisto onnistui." });
      }
      console.log(JSON.stringify(queryResult));
    } catch (e: any) {
      console.log(e);
      res.status(500).json({ error: "Tapahtui virhe." });
    }
  }
);

plantsRouter.patch(
  "/:id",
  async (req: express.Request, res: express.Response) => {
    try {
      const queryResult = await db.query(
        "SELECT * FROM plants WHERE plant_id=$1",
        [req.params.id]
      );

      if (!queryResult.rows) {
        res.status(404).json("Kasvi ei ole tietokannassa.");
        return;
      }

      const plantInDb = queryResult.rows[0];

      const queryResult2 = await db.query(
        "UPDATE plants " +
          "SET plant_name = $1, water_interval_days = $2," +
          "last_water = $3, water_deadline = $4, nutr_interval_days = $5," +
          "last_nutr = $6, nutr_deadline = $7, soil_interval_months = $8," +
          "last_soil = $9, soil_deadline = $10, info = $11 " +
          "WHERE plant_id = $12 RETURNING *",
        [
          req.body.plantName ?? plantInDb.plant_name,
          req.body.waterIntervalDays ?? plantInDb.water_interval_days,
          req.body.lastWater ?? plantInDb.last_water,
          req.body.waterDeadline ?? plantInDb.water_deadline,
          req.body.nutrIntervalDays ?? plantInDb.nutr_interval_days,
          req.body.lastNutr ?? plantInDb.last_nutr,
          req.body.nutrDeadline ?? plantInDb.nutr_deadline,
          req.body.soilIntervalMonths ?? plantInDb.soil_interval_months,
          req.body.lastSoil ?? plantInDb.last_soil,
          req.body.soilDeadline ?? plantInDb.soil_deadline,
          req.body.info ?? plantInDb.info,
          req.params.id,
        ]
      );
      if (queryResult2.rowCount === 0) {
        res.status(400).send({ error: "Lisäys ei onnistunut." });
      } else {
        res.json(plantInDb2Plant(queryResult2.rows[0]));
      }
    } catch (e: any) {
      console.log(e);
      res.status(500).json({ virhe: "Tapahtui virhe." });
    }
  }
);

const plantNameExists = async (plantName: string): Promise<boolean> => {
  try {
    const queryResult = await db.query(
      "SELECT * FROM plants WHERE plant_name=$1",
      [plantName]
    );
    if (queryResult.rowCount === 0) {
      return false;
    } else {
      return true;
    }
  } catch (e: any) {
    console.log(e);
    throw e;
  }
};

const plantInDb2Plant = (plantInDb: PlantInDb): Plant => {
  return {
    plantId: plantInDb.plant_id,
    createdAt: plantInDb.created_at,
    updatedAt: plantInDb.updated_at,
    plantName: plantInDb.plant_name,
    waterIntervalDays: plantInDb.water_interval_days,
    lastWater: plantInDb.last_water,
    waterDeadline: plantInDb.water_deadline,
    nutrIntervalDays: plantInDb.nutr_interval_days,
    lastNutr: plantInDb.last_nutr,
    nutrDeadline: plantInDb.nutr_deadline,
    soilIntervalMonths: plantInDb.soil_interval_months,
    lastSoil: plantInDb.last_soil,
    soilDeadline: plantInDb.soil_deadline,
    info: plantInDb.info,
  };
};

export default plantsRouter;
