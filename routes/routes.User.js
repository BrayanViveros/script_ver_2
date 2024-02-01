import { Router } from "express";
import {
  login,
  logout,
  register,
  verifyToken,
  // getAllTask,
} from "../controllers/auth.controller.js";


import { validateSchema } from "../middleware/VerificarToken.js";
import { loginSchema, registerSchema } from "../schemas/auth.schema.js";


const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);
// router.get("/admin", verifyToken(register), getAllTask );



export default router;
