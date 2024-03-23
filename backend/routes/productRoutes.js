const express = require("express");
const {
  getProductList,
  addNewProduct,
  getProduct,
  getCount,
  updateProduct,
  deleteProduct,
  getFeaturedProducts,
  uploadGalleryImages,
  getProductDetails,
  productCategory,
} = require("../controllers/productController");

const router = express.Router();

// get all products
router.get("/", getProductList);

// get product category
router.get("/categories", productCategory);

// get one product
router.get("/:id", getProduct);

// get product details
router.get("/slug/:slug", getProductDetails);

// get product count
router.get("/get/count", getCount);

// get featured products
router.get("/get/featured/:count", getFeaturedProducts);

// create a new product
router.post("/", addNewProduct);

// delete a product
router.delete("/:id", deleteProduct);

// update a product
router.put("/:id", updateProduct);

// upload gallery to a product
router.put("/gallery-images/:id", uploadGalleryImages);

module.exports = router;
