import express from "express";

const router = express.Router();

import {

    refresh

} from "../controllers/refresh.controller.js";

router.post("/refresh", refresh);

export default router;
