import Todo from "../model/todo.model.js";

/**
 * CREATE TODO
 */
export const createTodo = async (req, res) => {
  try {
    const todo = new Todo({
      title: req.body.title,
      text: req.body.text || "",
      description: req.body.description || "",
      completed: req.body.completed || false,
      priority: req.body.priority || "medium",
      tags: Array.isArray(req.body.tags)
        ? req.body.tags
        : [],
      user: req.user._id,
      deadline: req.body.deadline ? new Date(req.body.deadline) : null,
      linkedTodoId: req.body.linkedTodoId || null,
    });

    

    const newTodo = await todo.save();

    res.status(201).json({
      message: "Todo Created Successfully",
      todo: newTodo
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error occurring in todo creation"
    });
  }
};

/**
 * FETCH TODOS (with optional filters)
 * ?completed=true
 * ?priority=high
 * ?tag=work
 */
export const getTodos = async (req, res) => {
  try {
    const query = { user: req.user._id };

    if (req.query.completed !== undefined) {
      query.completed = req.query.completed === "true";
    }

    if (req.query.priority) {
      query.priority = req.query.priority;
    }

    if (req.query.tag) {
      query.tags = req.query.tag;
    }

    const todos = await Todo.find(query).sort({ createdAt: -1 });

    res.status(200).json({
      message: "Todos Fetched Successfully",
      todos
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error occurring in todo fetching"
    });
  }
};

export const getTodoById = async (req, res) => {
  try {
    const todo = await Todo.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({ todo });
  } catch (error) {
    console.error(error);
    res.status(400).json({ message: "Invalid todo id" });
  }
};


/**
 * UPDATE TODO
 */
export const updateTodo = async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (updateData.deadline) {
      updateData.deadline = new Date(updateData.deadline);
    }

     const todo = await Todo.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      {
        title: req.body.title,
        text: req.body.text,
        priority: req.body.priority,
        tags: req.body.tags,
        deadline: req.body.deadline,
        completed: req.body.completed,
        linkedNoteId: req.body.linkedNoteId,
        isPinned: req.body.isPinned
      },
      { new: true }
    );

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo Updated Successfully",
      todo
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error occurring in todo updating"
    });
  }
};

/**
 * DELETE TODO
 */
export const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo Deleted Successfully"
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error occurring in todo deletion"
    });
  }
};

/**
 * TODO STATS (Dashboard + Doughnut Chart)
 */
export const getTodoStats = async (req, res) => {
  try {
    const userId = req.user._id;

    const total = await Todo.countDocuments({ user: userId });
    const completed = await Todo.countDocuments({
      user: userId,
      completed: true
    });

    res.status(200).json({
      total,
      completed,
      remaining: total - completed
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error fetching todo stats"
    });
  }
};

/**
 * TODAY / FOCUS MODE TODOS
 */
export const getTodosByDate = async (req, res) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);

    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const todos = await Todo.find({
      user: req.user._id,
      deadline: { $gte: start, $lte: end },
      completed: false
    }).sort({ deadline: 1 });

    res.status(200).json({
      message: "Today's Todos",
      todos
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      message: "Error fetching today's todos"
    });
  }
};
