const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models");

async function authentication(req, res, next) {
  const token = req.headers.authorization;
  let authToken;
  if (!token.startsWith("Bearer ")) throw { name: "no header" };
  console.log("Headers was found");
  authToken = token.split(" ")[1];
  console.log(authToken);
  try {
    const decodedToken = verifyToken(authToken);
    console.log(decodedToken);
    const user = await User.findOne({
      where: {
        id: decodedToken.id,
        email: decodedToken.email,
      },
    });
    req.user = user;
    // console.log("Decoded Token " + user);
    return next();
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
}

module.exports = authentication;
