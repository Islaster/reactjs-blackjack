import express from "express";
const router = express.Router();
import {
  createEntry,
  getAllEntries,
  getEntryById,
  deleteEntry,
  updateEntry,
} from "../controllers/leaderboard.js";

router.post("/", createEntry);
router.get("/", getAllEntries);
router.get("/:id", getEntryById);
router.put("/:id", updateEntry);
router.delete("/:id", deleteEntry);

export default router;
