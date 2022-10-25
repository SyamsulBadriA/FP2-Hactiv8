const { User } = require("../models");

async function userAuthorize(req, res, next) {
  const userId = req.params.userId;
  const authenticatedUser = req.user;

  try {
    const user = await User.findOne({
      where: {
        id: userId,
      },
    });
    if (!user) {
      return res.status(404).json({
        name: "Data Not Found",
        message: `User with id "${userId}" not found on Database`,
      });
    }
    if (user.id === authenticatedUser.id) {
      return next();
    } else {
      return res.status(403).json({
        name: "Authorization Error",
        message: `User with id "${authenticatedUser.id}" does not have permission to Edit User with id ${userId}`,
      });
    }
  } catch (error) {}
}

module.exports = userAuthorize;
