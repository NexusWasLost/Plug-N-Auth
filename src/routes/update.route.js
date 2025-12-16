import express from "express";
import { verifyToken } from "../middlewares/auth.js";

const router = express.Router();

import {

    update,
    updateEmail,
    updatePass

} from "../controllers/update.controller.js";

router.put("/update", verifyToken, update);
router.put("/updateEmail", verifyToken, updateEmail);
router.put("/updatePass", verifyToken, updatePass);

export default router;
