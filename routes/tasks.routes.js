import { Router } from "express";
import {
  createTask,
  deleteTask,
  getTasks,
  getAllTask,
  updateTask,
} from "../controllers/tasks.controllers.js";
import { auth } from "../middleware/AuthUser.js";
import { validateSchema } from "../middleware/VerificarToken.js";
import { createTaskSchema } from "../schemas/task-schema.js";

const router = Router();

router.get("/tasks", auth, getAllTask);

router.post("/tasks", auth, validateSchema(createTaskSchema), createTask);

router.get("/tasks/:id", auth, getTasks);

router.put("/tasks/:id", auth, updateTask);

router.delete("/tasks/:id", auth, deleteTask);

export default router;
