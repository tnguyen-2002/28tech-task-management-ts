import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/user.controller";

router.get("/register", controller.register);

router.get("/login", controller.login);

export const userRoute = router;