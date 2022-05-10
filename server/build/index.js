"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const db = require("./db");
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const plants_1 = __importDefault(require("./routes/plants"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
const port = Number(process.env.PORT) || 3109;
const CLIENT_URL = process.env.NODE_ENV === "production"
    ? process.env.CLIENT_URL
    : process.env.CLIENT_URL_DEV;
// app.use(express.static(path.resolve(__dirname, "public")));
app.use((0, cors_1.default)({ origin: CLIENT_URL }));
app.use("/api/plants", plants_1.default);
const clientBuildDir = "../../client/build";
app.use(express_1.default.static(path_1.default.resolve(__dirname, clientBuildDir)));
app.get("/*", (_req, res) => {
    console.log("/*");
    res.sendFile(path_1.default.resolve(__dirname, clientBuildDir, "index.html"), function (err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});
app.listen(port, () => {
    console.log(`Palvelin käynnissä portissa: ${port}`);
});
