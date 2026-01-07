import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodos,
  getTodoById,
  updateTodo,
  getTodoStats,
  getTodosByDate,
} from "../controller/todo.controller.js";

import { authenticate } from "../middleware/authorize.js";

const router = express.Router();

/**
 * TODOS CRUD
 */
router.post("/create", authenticate, createTodo);
router.get("/fetch", authenticate, getTodos);
router.get("/todo/:id", authenticate, getTodoById);
router.put("/update/:id", authenticate, updateTodo);
router.delete("/delete/:id", authenticate, deleteTodo);

/**
 * ANALYTICS & EXTRA FEATURES
 */
router.get("/stats", authenticate, getTodoStats); // doughnut chart
router.get("/today", authenticate, getTodosByDate); // focus / today view

export default router;
