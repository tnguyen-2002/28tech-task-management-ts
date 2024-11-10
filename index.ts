import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { connect } from "./config/database";
connect();

import { routesClient } from "./routes/client/index.route";

const app: Express = express();
const port: String = process.env.PORT;

routesClient(app);

app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});