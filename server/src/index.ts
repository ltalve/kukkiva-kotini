const db = require("./db");
import express from "express";
import path from "path";
import cors from "cors";
import plantsRouter from "./routes/plants";

const app: express.Application = express();

app.use(express.json());

const port: number = Number(process.env.PORT) || 3109;

app.use(cors());

app.use("/api/plants", plantsRouter);

const clientBuildDir = "../../client/build";
app.use(express.static(path.resolve(__dirname, clientBuildDir)));
app.get("/*", (_req, res) => {
  res.sendFile(
    path.resolve(__dirname, clientBuildDir, "index.html"),
    function (err) {
      if (err) {
        res.status(500).send(err);
      }
    }
  );
});

app.listen(port, () => {
  console.log(`Palvelin käynnissä portissa: ${port}`);
});
