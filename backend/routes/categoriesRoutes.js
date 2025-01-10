const express = require("express");
const {
  addCategory,
  deleteCategory,
  getAllCategory,
  getCategory,
  updateCategory,
} = require("../controllers/categoriesController");

const router = express.Router();

// get categories
router.get("/:id", getCategory);
router.get("/", getAllCategory);

// add category
router.post("/", addCategory);

// update category
router.put("/:id", updateCategory);

// delete category
router.delete("/:id", deleteCategory);

module.exports = router;
