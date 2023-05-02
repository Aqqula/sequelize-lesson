const createError = require("http-errors");
const { Task } = require("../models");

module.exports.createTask = async (req, res, next) => {
  try {
    const { body, userInstance } = req;
    const task = await userInstance.createTask(body);
    res.status(201).send({ data: task });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserTasks = async (req, res, next) => {
  try {
    const { userInstance, pagination = {} } = req;
    const tasks = await userInstance.getTasks(pagination);
    if (tasks.length === 0) {
      return res.status(204).send();
    }
    res.status(200).send({ data: tasks });
  } catch (error) {
    next(error);
  }
};

module.exports.updateTask = async (req, res, next) => {
  try {
    const { body, taskInstance } = req;
    const taskUpdated = await taskInstance.update(body);
    res.status(200).send({ data: taskUpdated });
  } catch (error) {
    next(error);
  }
};

module.exports.deleteTask = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    await taskInstance.destroy();
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};

module.exports.getTaskByPk = async (req, res, next) => {
  try {
    const { taskInstance } = req;
    res.status(200).send({ data: taskInstance });
  } catch (error) {
    next(error);
  }
};
