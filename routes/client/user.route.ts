import express from "express";
const router = express.Router();

import * as controller from "../../controllers/client/user.controller";

router.get("/register", controller.register);

router.get("/login", controller.login);

router.get("/profile", controller.profile);

export const userRoute = router;