const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { User } = require("../models/userModel");
const { generateToken } = require("../middlewares/jwt2");

const signup = async (req, res) => {
  try {
    const newUser = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 10), // Asynchronous hashing
      // isAdmin: req.body.isAdmin || false, // Default to false if not provided
    });

    const user = await newUser.save();

    res.status(201).json({
      user: {
        id: user.id,
        name: user.name.split(" ")[0],
        email: user.email,
        isAdmin: user.isAdmin,
        token: generateToken(user),
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    if (user && bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(200).json({
        message: "User Authenticated!",
        user: {
          id: user.id,
          name: user.name.split(" ")[0],
          email: user.email,
          isAdmin: user.isAdmin,
          token: generateToken(user),
        },
      });
    } else {
      return res
        .status(400)
        .json({ message: "Email or password is incorrect!" });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

const getUsers = async (req, res) => {
  try {
    const userList = await User.find().select("-passwordHash");
    console.log(userList);

    if (!userList || userList.length === 0) {
      return res.status(404).json({ message: "User list not found" });
    }

    res.status(200).json(userList);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id).select("-passwordHash");
    console.log(user);

    if (!user || user.length === 0) {
      return res.status(404).json({ message: "User list not found" });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    res.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCount = async (req, res) => {
  try {
    const userCount = await User.countDocuments();

    if (userCount === 0) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ userCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateUserProfile = async (req, res) => {
  const user = await User.findById(req.user.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    if (req.body.password) {
      user.password = bcrypt.hashSync(req.body.password, 10);
    }

    const updateUser = await user.save();

    res.status(200).json({
      message: "Success",
      user: {
        id: updateUser.id,
        name: updateUser.name,
        email: updateUser.email,
        isAdmin: updateUser.isAdmin,
        token: generateToken(updateUser),
      },
    });
  } else {
    res.status(404).send({ message: "User not found" });
  }
};

module.exports = {
  signup,
  login,
  getUsers,
  getUser,
  getCount,
  deleteUser,
  updateUserProfile,
};
