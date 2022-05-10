"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db = require("../db");
const plantsRouter = express_1.default.Router();
plantsRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log("wohoo!!");
        const queryResult = yield db.query("SELECT * FROM plants");
        const plants = queryResult.rows.map((result) => {
            const plant = {
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
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ virhe: "Tapahtui virhe." });
    }
}));
plantsRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d, _e, _f, _g, _h, _j;
    try {
        const newPlant = {
            plantName: req.body.plantName,
            waterIntervalDays: req.body.waterIntervalDays,
            lastWater: (_a = req.body.lastWater) !== null && _a !== void 0 ? _a : null,
            waterDeadline: (_b = req.body.waterDeadline) !== null && _b !== void 0 ? _b : null,
            nutrIntervalDays: (_c = req.body.nutrIntervalDays) !== null && _c !== void 0 ? _c : null,
            lastNutr: (_d = req.body.lastNutr) !== null && _d !== void 0 ? _d : null,
            nutrDeadline: (_e = req.body.nutrDeadline) !== null && _e !== void 0 ? _e : null,
            soilIntervalMonths: (_f = req.body.soilIntervalMonths) !== null && _f !== void 0 ? _f : null,
            lastSoil: (_g = req.body.lastSoil) !== null && _g !== void 0 ? _g : null,
            soilDeadline: (_h = req.body.soilDeadline) !== null && _h !== void 0 ? _h : null,
            info: (_j = req.body.info) !== null && _j !== void 0 ? _j : null,
        };
        if (yield plantNameExists(newPlant.plantName)) {
            res.status(400).send("Kasvin nimi on jo tietokannassa.");
            return;
        }
        console.log("adding new plant: " + newPlant.plantName);
        console.log(JSON.stringify(req.body));
        const queryResult = yield db.query("INSERT INTO plants (plant_name, water_interval_days, last_water, water_deadline, nutr_interval_days," +
            "last_nutr, nutr_deadline, soil_interval_months, last_soil, soil_deadline, info)" +
            "VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)", [
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
        ]);
        if (queryResult.rowCount === 0) {
            res.status(400).send({ error: "Lisäys ei onnistunut." });
        }
        else {
            res.json({ success: "Lisäys onnistui." });
        }
        console.log(JSON.stringify(queryResult));
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "Tapahtui virhe." });
    }
}));
plantsRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryResult = yield db.query("DELETE FROM plants WHERE plant_id=$1", [req.params.id]);
        if (queryResult.rowCount === 0) {
            res
                .status(404)
                .send({ error: "Poistettavaa kasvia ei ole tietokannassa." });
        }
        else {
            res.json({ success: "Poisto onnistui." });
        }
        console.log(JSON.stringify(queryResult));
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ error: "Tapahtui virhe." });
    }
}));
plantsRouter.patch("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _k, _l, _m, _o, _p, _q, _r, _s, _t, _u, _v;
    try {
        const queryResult = yield db.query("SELECT * FROM plants WHERE plant_id=$1", [req.params.id]);
        if (!queryResult.rows) {
            res.status(404).json("Kasvi ei ole tietokannassa.");
            return;
        }
        const plantInDb = queryResult.rows[0];
        const queryResult2 = yield db.query("UPDATE plants " +
            "SET plant_name = $1, water_interval_days = $2," +
            "last_water = $3, water_deadline = $4, nutr_interval_days = $5," +
            "last_nutr = $6, nutr_deadline = $7, soil_interval_months = $8," +
            "last_soil = $9, soil_deadline = $10, info = $11 " +
            "WHERE plant_id = $12 RETURNING *", [
            (_k = req.body.plantName) !== null && _k !== void 0 ? _k : plantInDb.plant_name,
            (_l = req.body.waterIntervalDays) !== null && _l !== void 0 ? _l : plantInDb.water_interval_days,
            (_m = req.body.lastWater) !== null && _m !== void 0 ? _m : plantInDb.last_water,
            (_o = req.body.waterDeadline) !== null && _o !== void 0 ? _o : plantInDb.water_deadline,
            (_p = req.body.nutrIntervalDays) !== null && _p !== void 0 ? _p : plantInDb.nutr_interval_days,
            (_q = req.body.lastNutr) !== null && _q !== void 0 ? _q : plantInDb.last_nutr,
            (_r = req.body.nutrDeadline) !== null && _r !== void 0 ? _r : plantInDb.nutr_deadline,
            (_s = req.body.soilIntervalMonths) !== null && _s !== void 0 ? _s : plantInDb.soil_interval_months,
            (_t = req.body.lastSoil) !== null && _t !== void 0 ? _t : plantInDb.last_soil,
            (_u = req.body.soilDeadline) !== null && _u !== void 0 ? _u : plantInDb.soil_deadline,
            (_v = req.body.info) !== null && _v !== void 0 ? _v : plantInDb.info,
            req.params.id,
        ]);
        if (queryResult2.rowCount === 0) {
            res.status(400).send({ error: "Lisäys ei onnistunut." });
        }
        else {
            res.json(plantInDb2Plant(queryResult2.rows[0]));
        }
    }
    catch (e) {
        console.log(e);
        res.status(500).json({ virhe: "Tapahtui virhe." });
    }
}));
const plantNameExists = (plantName) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryResult = yield db.query("SELECT * FROM plants WHERE plant_name=$1", [plantName]);
        if (queryResult.rowCount === 0) {
            return false;
        }
        else {
            return true;
        }
    }
    catch (e) {
        console.log(e);
        throw e;
    }
});
const plantInDb2Plant = (plantInDb) => {
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
exports.default = plantsRouter;
