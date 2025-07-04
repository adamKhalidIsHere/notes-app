const express = require("express");

const protectRoute = require("../middleware/protectRoute.js");
const {
  getNotes,
  createNote,
  updateNote,
  deleteNote,
  getOneNote
} = require("../controllers/note.controller.js");

const router = express.Router();

router.get("/", protectRoute, getNotes);
router.post("/create", protectRoute, createNote);
router.patch("/update/:noteId", protectRoute, updateNote);
router.delete("/delete/:noteId", protectRoute, deleteNote);
router.get("/:noteId", protectRoute, getOneNote)

module.exports = router;
