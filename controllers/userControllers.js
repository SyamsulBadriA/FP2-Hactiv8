const { comparePassword, hashPassword } = require("../helpers/bcrypt");
const { generateToken } = require("../helpers/jwt");
const { User } = require("../models");

class UserController {
  static registerUser(req, res) {
    const {
      email,
      full_name,
      username,
      password,
      profile_image_url,
      age,
      phone_number,
    } = req.body;

    const hashedPassword = hashPassword(password);

    const createUser = {
      email,
      full_name,
      username,
      password: hashedPassword,
      profile_image_url,
      age,
      phone_number,
    };
    console.log(hashedPassword, password);
    User.create(createUser)
      .then((result) => {
        const response = {
          user: {
            email: result.email,
            full_name: result.full_name,
            username: result.username,
            profile_image_url: result.profile_image_url,
            age: result.age,
            phone_number: result.phone_number,
          },
        };
        res.status(201).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }

  static async loginUser(req, res, next) {
    const { email, password } = req.body;
    try {
      const user = await User.findOne({
        where: {
          email,
        },
      });
      if (!user)
        throw {
          name: "User Login Error",
          message: `User with Email ${email} not found`,
        };

      const isCorrect = comparePassword(password, user.password);
      if (!isCorrect) {
        throw {
          name: "User Login Error",
          message: `User's password with email ${email} does not match`,
        };
      }
      const payload = {
        id: user.id,
        email: user.email,
        username: user.username,
      };

      const token = generateToken(payload);
      res.status(200).json({ token });
    } catch (error) {
      next(error);
      console.log(error);
    }
  }

  static editUser(req, res) {
    const userId = +req.params.userId;
    const { email, full_name, username, profile_image_url, age, phone_number } =
      req.body;

    const updateUser = {
      email,
      full_name,
      username,
      profile_image_url,
      age,
      phone_number,
    };

    User.update(updateUser, {
      where: {
        id: userId,
      },
      returning: true,
    })
      .then((result) => {
        let response = {
          user: {
            email: result[1][0].email,
            full_name: result[1][0].full_name,
            username: result[1][0].username,
            profile_image_url: result[1][0].profile_image_url,
            age: result[1][0].age,
            phone_number: result[1][0].phone_number,
          },
        };
        res.status(200).json(response);
      })
      .catch((err) => {
        res.status(500).json(err);
      });
  }
}

module.exports = UserController;
