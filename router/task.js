const express = require("express");

const router = express.Router();

router.use(express.json());

let {
  loadTasks,
  singleTask,
  addTask,
  updateTask,
  deleteTask,
} = require("../controller/taskController");

router.route("/tasks").get(loadTasks).post(addTask);

router.route("/task/:id").get(singleTask).put(updateTask).delete(deleteTask);

module.exports = router;
