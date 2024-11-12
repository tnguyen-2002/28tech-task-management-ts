import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/task.controller";

router.get("/", controller.index);

router.get("/detail/:id", controller.detail);

router.patch("/change-multi", controller.changeMultiPatch);

router.post("/create-task", controller.createTask);

router.patch("/update-task", controller.updateTask);

router.patch("/delete-task", controller.deleteTask);

export const tasksRoute = router;