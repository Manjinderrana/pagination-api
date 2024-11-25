import { Router } from "express";
import { chunks } from "./controller";

export const router = Router()

router.post('/chunk', chunks)

