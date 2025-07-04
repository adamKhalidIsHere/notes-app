const Note = require("../models/note.model");

const getNotes = async (req, res) => {
  const user = req.user;
  try {
    const notes = await Note.find({ userId: user._id });
    return res.status(200).json({ success: true, notes });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in getNotes controller: ", error.message);
  }
};
const createNote = async (req, res) => {
  const user = req.user;
  const { title, content } = req.body;

  try {
    if (!title && !content) {
      return res.status(400).json({ error: "All fields must be filled" });
    }
    const newNote = new Note({
      userId: user._id,
      title,
      content,
    });
    await newNote.save();
    return res.status(201).json({ success: true, note: newNote });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in createNote controller: ", error);
  }
};
const updateNote = async (req, res) => {
  const noteId = req.params.noteId;
  const { title, content } = req.body;

  try {
    const note = await Note.findById(noteId);
    if (note.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!note) return res.status(404).json({ error: "Note not found" });

    if (!title && !content)
      return res.status(400).json({ error: "There is nothing to update" });

    if (title) note.title = title;
    if (content) note.content = content;

    await note.save();

    return res.status(200).json({ message: "Note updated successfully", note });
  } catch (error) {
    console.log("Error in updateNote controller: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const deleteNote = async (req, res) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.findById(noteId);
    if (note.userId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: "Unauthorized" });
    }

    if (!note) {
      return res.status(404).json({ error: "Note not found" }); // <-- added return
    }

    await Note.findByIdAndDelete(noteId);
    return res.status(200).json({ message: "Deleted successfully" });
  } catch (error) {
    console.log("Error in deleteNote controller: ", error);
    return res.status(500).json({ error: "Internal server error" });
  }
};

const getOneNote = async (req, res) => {
  const noteId = req.params.noteId;
  try {
    const note = await Note.findById(noteId);
    if (!note || note.userId.toString() !== req.user._id.toString()) {
      return res
        .status(404)
        .json({ error: !note ? "Note not found" : "Unauthorized" });
    }
    res.status(200).json({ note });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
    console.log("Error in getOneNote controller: ", error);
  }
};

module.exports = { getNotes, createNote, updateNote, deleteNote, getOneNote };
