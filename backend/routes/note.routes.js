import express from "express";
import {
  createNote,
  getNotes,
  updateNote,
  deleteNote,
  getNotesByTodo,
  getNoteById
} from "../controller/note.controller.js";

import { authenticate } from "../middleware/authorize.js";

const router = express.Router();

router.post("/create", authenticate, createNote);
router.get("/fetch", authenticate, getNotes);
router.get("/notes/:id", authenticate, getNoteById);
router.put("/update/:id", authenticate, updateNote);
router.delete("/delete/:id", authenticate, deleteNote);

/**
 * NOTES LINKED TO TODO
 */
router.get("/todo/:todoId", authenticate, getNotesByTodo);

export default router;
