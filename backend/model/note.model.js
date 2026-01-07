import mongoose from "mongoose";

const noteSchema = new mongoose.Schema(
  {
    title: { 
      type: String,
      required: true
    },
    content: String, // markdown supported
    tags: [String],

    linkedTodoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Todo",
      default: null,
    },
    isPinned: {
      type: Boolean,
      default: false
    },

    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  },
  { timestamps: true }
);

const Note = mongoose.model("Note", noteSchema);

export default Note;