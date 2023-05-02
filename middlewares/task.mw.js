const createError = require("http-errors");
const { Task } = require("../models");

module.exports.checkTask = async (req, res, next) => {
  try {
    const {
      userInstance,
      params: { idTask },
    } = req;
    const task = await Task.findByPk(idTask);
    if (!task) {
      return next(createError(404, "task not found"));
    }
    req.taskInstance = task;
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.checkIsUserTask = async (req, res, next) => {
    try {
      const {
        userInstance,
        taskInstance,
      } = req;
      const checkHas = await userInstance.hasTask(taskInstance);
      console.log("checkHas = ", checkHas);
      if (!checkHas) {
        return next(createError(403, "no action"));
      }
      next();
    } catch (error) {
      next(error);
    }
  };