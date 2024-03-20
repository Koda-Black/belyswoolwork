const express = require("express");
const {
  getUsers,
  getUser,
  signup,
  login,
  getCount,
  deleteUser,
} = require("../controllers/userController");
const { isAuth } = require("../middlewares/jwt2");

const router = express.Router();

// Auth Controller functions

// login route
router.post("/login", login);

// signup route
router.post("/signup", signup);

// get all users
router.get("/", getUsers);

// get user count
router.get("/get/count", getCount);

// get user
router.get("/:id", getUser);

// delete user
router.delete("/:id", deleteUser);

module.exports = router;
