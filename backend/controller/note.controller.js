// import Note from "../model/note.model.js";
import Note from "../model/note.model.js";

/**
 * CREATE NOTE
 */
export const createNote = async (req, res) => {
  try {
    if (!req.body || !req.body.title) {
      return res.status(400).json({
        message: "Note title is required"
      });
    }

    const note = new Note({
      title: req.body.title,
      content: req.body.content || "",
      tags: req.body.tags || [],
      linkedTodoId: req.body.linkedTodoId || null,
      userId: req.user._id
    });

    const newNote = await note.save();

    res.status(201).json({
      message: "Note created successfully",
      note: newNote
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error creating note"
    });
  }
};

/**
 * FETCH NOTES
 * Optional filters:
 * ?tag=work
 * ?todoId=123
 */
export const getNotes = async (req, res) => {
  try {
    const query = { userId: req.user._id };

    if (req.query.tag) {
      query.tags = req.query.tag;
    }

    if (req.query.todoId) {
      query.linkedTodoId = req.query.todoId;
    }

    const notes = await Note.find(query).sort({ updatedAt: -1 });

    res.status(200).json({
      message: "Notes fetched successfully",
      notes
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error fetching notes"
    });
  }
};

export const getNoteById = async (req, res) => {
  try {
    const note = await Note.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({ note });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid note id" });
  }
};


/**
 * UPDATE NOTE
 */
export const updateNote = async (req, res) => {
  try {
    const note = await Note.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      req.body,
      { new: true }
    );

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note updated successfully",
      note
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error updating note"
    });
  }
};

/**
 * DELETE NOTE
 */
export const deleteNote = async (req, res) => {
  try {
    const note = await Note.findOneAndDelete({
      _id: req.params.id,
      userId: req.user._id
    });

    if (!note) {
      return res.status(404).json({ message: "Note not found" });
    }

    res.status(200).json({
      message: "Note deleted successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error deleting note"
    });
  }
};

/**
 * GET NOTES LINKED TO A TODO
 */
export const getNotesByTodo = async (req, res) => {
  try {
    const notes = await Note.find({
      userId: req.user._id,
      linkedTodoId: req.params.todoId
    }).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Notes linked to todo",
      notes
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error fetching notes for todo"
    });
  }
};
