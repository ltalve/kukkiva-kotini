// import db from "./db";
const db = require("./db");
import express from "express";
import path from "path";
import cors from "cors";
import plantsRouter from "./routes/plants";

const app: express.Application = express();

app.use(express.json());

const portti: number = Number(process.env.PORT) || 3109;

app.use(express.static(path.resolve(__dirname, "public")));

app.use(cors({ origin: "http://localhost:3000" }));

app.use("/api/plants", plantsRouter);

app.listen(portti, () => {
  console.log(`Palvelin käynnissä portissa: ${portti}`);
});
