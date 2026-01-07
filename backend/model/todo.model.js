import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
  title: { 
    type: String,
    default: "Todo",
  },
  description: {
    type: String, maxLength: 500
  },
  text: {
    type: String,
    required: true,
  },
  completed: {
    type: Boolean,
    required: true,
  },
  priority: {
    type: String,
    enum: ["low", "medium", "high"],
    default: "medium"
  },
  tags: [String],
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  linkedNoteId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Note",
    default: null,
  },
  isPinned: {
    type: Boolean,
    default: false
  },
  // New fields
  createdAt: {
    type: Date,
    default: Date.now, // automatically sets creation time
  },
  deadline: {
    type: Date, // optional, can be set from frontend
  },
});

const Todo = mongoose.model("Todo", todoSchema);

export default Todo;
