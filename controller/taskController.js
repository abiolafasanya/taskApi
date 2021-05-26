const Task = require("../models/Task");

// Load Task from database
exports.loadTasks = async (req, res, next) => {
  try {
    await Task.find({}, (err, task) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      if (!task) {
        res.status(400).json({
          status: 400,
          message: "tasks not found",
          err,
        });
        return;
      }
      if (task.length < 1) {
        res.status(200).json({
          status: 200,
          message: "No task to show",
        });
        console.log(`${task.length} are available`);
        return;
      }
      res.status(200).json({
        status: 200,
        message: `tasks available`,
        total: task.length,
        task,
      });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Load single task from database
exports.singleTask = async (req, res, next) => {
  try {
    await Task.findOne({ _id: req.params.id }, (err, task) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      if (!task) {
        res.status(400).json({
          status: 400,
          message: "task not found",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: "tasks",
        task,
      });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Add Task to database
exports.addTask = async (req, res, next) => {
  try {
    const { task, description, reminder } = req.body;
    const request = { task, description, reminder };
    await Task.create(request, (err, task) => {
      if (err) {
        res.status(401).json({ status: 401, err: err.message });
        return;
      }
      if (!task) {
        res.status(400).json({
          status: 400,
          message: "task could not be added",
        });
        return;
      }
      res.status(201).json({
        status: 201,
        message: task,
      });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

//Update task in database
exports.updateTask = async (req, res, next) => {
  try {
    const { task, description, reminder, date } = req.body;
    let tasks = { task, description, reminder, date };

    Task.findOneAndUpdate({ _id: req.params.id }, tasks, (err, task) => {
      if (err) {
        res.status(400).json({ message: err });
        return;
      }

      if (!task) {
        res.status(400).json({
          status: 400,
          message: "task not found",
        });
        return;
      }

      res.status(200).json({
        status: 200,
        message: "task has been updated",
        task,
      });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};

// Delete task from the database
exports.deleteTask = async (req, res, next) => {
  try {
    Task.findOneAndRemove({ _id: req.params.id }, (err, task) => {
      if (err) {
        res.status(500).json({ message: err });
        return;
      }
      if (!task) {
        res.status(400).json({ message: "task not found" });
        return;
      }
      res.status(200).json({
        status: 200,
        message: "task has been removed",
      });
    });
  } catch (err) {
    res.status(500).json({ message: err });
  }
};
