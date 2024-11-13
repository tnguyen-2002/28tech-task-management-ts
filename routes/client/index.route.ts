import { Express } from "express";
import { tasksRoute } from "./task.route";
import { userRoute } from "./user.route";

export const routesClient = (app: Express) => {
    app.use("/tasks", tasksRoute);

    app.use ("/users", userRoute);
}

