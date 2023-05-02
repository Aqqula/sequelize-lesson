const { Router } = require("express");
const GroupController = require("../controllers/group.controller");
const upload = require("../middlewares/upload.mw");
const { checkGroup } = require("../middlewares/group.mw");

const groupRouter = Router();

groupRouter.post("/", upload.single("image"), GroupController.createGroup);

groupRouter.get("/users/:idUser", GroupController.getUserGroups);

groupRouter.patch("/:idGroup", GroupController.addUserAtGroup);

//http://localhost:3000/api/groups/4/users HTTP/1.1

groupRouter.get("/:idGroup/users", GroupController.getUsersInGroup);

groupRouter.patch(
  "/:idGroup/image",
  upload.single("image"),
  GroupController.addImage
);

groupRouter.delete("/:idGroup", checkGroup, GroupController.deleteGroupByPk);

groupRouter.get(
  "/:idGroup/count",
  checkGroup,
  GroupController.countUsersInGroup
);

groupRouter.put(
  "/:idGroup",
  checkGroup,
  upload.single("image"),
  GroupController.updateGroup
);

module.exports = groupRouter;
