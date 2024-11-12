import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/task.controller";

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-multi", controller.changeMultiPatch);

router.post("/create-task", controller.createTask);

export const tasksRoute = router;