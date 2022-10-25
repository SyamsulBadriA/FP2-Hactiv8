const bcrypt = require("bcrypt");

function hashPassword(userPassword) {
  const salt = bcrypt.genSaltSync(10);

  const hashPassword = bcrypt.hashSync(userPassword, salt);

  return hashPassword;
}

function comparePassword(userPassword, hashPassword) {
  return bcrypt.compareSync(userPassword, hashPassword);
}

module.exports = { hashPassword, comparePassword };
