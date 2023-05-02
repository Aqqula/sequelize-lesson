const _ = require("lodash");

const createError = require("http-errors");
const { Group, User } = require("../models");
const group = require("../models/group");

const pickBody = (body) =>
  _.pick(body, ["title", "imagePath", "description", "isPrivate"]);

module.exports.createGroup = async (req, res, next) => {
  try {
    const {
      body,
      file: { filename },
    } = req;
    const values = pickBody(body);
    values.imagePath = filename;
    console.log(values);
    const newGroup = await Group.create(values);

    //find user
    const user = await User.findByPk(body.userId, {
      attributes: {
        exclude: ["password"],
      },
    });
    if (!user) {
      return next(createError(404, "User not found"));
    }
    await newGroup.addUser(user);

    res.status(201).send({ data: newGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.addImage = async (req, res, next) => {
  try {
    const {
      file: { filename },
      params: { idGroup },
    } = req;
    const [, [groupUpdated]] = await Group.update(
      {
        imagePath: filename,
      },
      {
        where: { id: idGroup },
        returning: true,
      }
    );
    res.status(200).send({ data: { groupUpdated } });
  } catch (error) {
    next(error);
  }
};

module.exports.getUsersInGroup = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
    } = req;
    const usersInGroup = await Group.findByPk(idGroup, {
      include: [
        {
          model: User,
          attributes: ["id", "email", "isMale"],
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!usersInGroup) {
      return next(createError(404, "Group not found"));
    }

    res.status(201).send({ data: usersInGroup });
  } catch (error) {
    next(error);
  }
};

module.exports.getUserGroups = async (req, res, next) => {
  try {
    const {
      params: { idUser },
    } = req;
    const userWithGroups = await User.findByPk(idUser, {
      attributes: {
        exclude: ["password"],
      },
      include: [
        {
          model: Group,
          through: {
            attributes: [],
          },
        },
      ],
    });

    if (!userWithGroups) {
      return next(createError(404, "User not found"));
    }

    res.status(201).send({ data: userWithGroups });
  } catch (error) {
    next(error);
  }
};

module.exports.addUserAtGroup = async (req, res, next) => {
  try {
    const {
      params: { idGroup },
      body: { userId },
    } = req;
    //get group
    const group = await Group.findByPk(idGroup);
    if (!group) {
      return next(createError(404, "Group not found"));
    }
    //get user
    const user = await User.findByPk(userId);
    if (!user) {
      return next(createError(404, "User not found"));
    }
    //connect user to group
    await group.addUser(user);
    res.status(200).send({ data: group });
  } catch (error) {
    next(error);
  }
};

//delete - delete
module.exports.deleteGroupByPk = async (req, res, next) => {
  try {
    const { groupInstance } = req;
    await groupInstance.destroy();
    res.status(200).send({ data: groupInstance });
  } catch (error) {
    next(error);
  }
};

//count users in group - get
module.exports.countUsersInGroup = async (req, res, next) => {
  try {
    const { groupInstance } = req;
    const count = await groupInstance.countUsers();
    console.log(count);
    res.status(200).send({ data: count });
  } catch (error) {
    next(error);
  }
};

//update - put
module.exports.updateGroup = async (req, res, next) => {
  try {
    const {
      body,
      groupInstance,
      file: { filename },
    } = req;
    const updatedGroup = await groupInstance.update(
      { ...body, imagePath: filename },
      { returning: true }
    );
    res.status(200).send({ data: { updatedGroup } });
  } catch (error) {
    next(error);
  }
};
