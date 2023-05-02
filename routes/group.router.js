const { Router } = require("express");
const GroupController = require("../controllers/group.controller");
const upload = require("../middlewares/upload.mw");

const groupRouter = Router();

groupRouter.post("/", GroupController.createGroup);

groupRouter.get("/users/:idUser", GroupController.getUserGroups);

groupRouter.patch("/:idGroup", GroupController.addUserAtGroup);

//http://localhost:3000/api/groups/4/users HTTP/1.1

groupRouter.get("/:idGroup/users", GroupController.getUsersInGroup);

groupRouter.patch(
  "/:idGroup/image",
  upload.single("image"),
  GroupController.addImage
);

module.exports = groupRouter;
