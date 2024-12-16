import { Router } from "express";
import { registerUser ,user} from "../controllers/user.controller.js";

const router = Router()

router.route("/register").post(registerUser)
router.route("/login").post(user)

export default router;