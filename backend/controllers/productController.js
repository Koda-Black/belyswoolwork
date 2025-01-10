const mongoose = require("mongoose");
const { Category } = require("../models/categoryModel");
const { Product } = require("../models/productModel");
const multer = require("multer");

const FILE_TYPE_MAP = {
  "image/png": "png",
  "image/jpg": "jpg",
  "image/jpeg": "jpeg",
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const isValid = FILE_TYPE_MAP[file.mimetype];

    let uploadError = new Error("Invalid image type");

    if (isValid) {
      uploadError = null;
    }

    cb(uploadError, "public/uploads");
  },
  filename: function (req, file, cb) {
    const filename = file.originalname.split(" ").join("-");
    const extension = FILE_TYPE_MAP[file.mimetype];
    cb(null, `${filename}-${Date.now()}.${extension}`);
  },
});

const uploadOptions = multer({ storage: storage });

const getProductList = async (req, res) => {
  try {
    let filter = {};

    if (req.query.categories) {
      filter = { category: req.query.categories.split(",") };
    }

    const productList = await Product.find(filter)
      .select(
        "name image description category brand price rating numReviews countInStock slug"
      )
      .populate("category");

    if (!productList || productList.length === 0) {
      return res.status(404).json({ message: "No products found" });
    }

    res.status(200).json({ productList });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id).populate("category");

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getProductDetails = async (req, res) => {
  try {
    const product = await Product.findOne({ slug: req.params.slug }).populate(
      "category"
    );

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addNewProduct = async (req, res) => {
  try {
    uploadOptions.single("image")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Error uploading image" });
      }

      const category = await Category.findById(req.body.category);
      if (!category) {
        return res.status(400).json({ message: "Invalid category" });
      }

      const file = req.file;
      if (!file)
        return res.status(400).json({ message: "No image in the request" });

      const filename = req.file.filename;
      const basePath = `${req.protocol}://${req.get("host")}/public/upload`;

      let product = new Product({
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        // image: `${basePath}/${filename}`,
        image: `${filename}`,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      });

      product = await product.save();

      res.status(201).json({
        message: "New product added successfully",
        product,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const updateProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      res.status(400).json({ message: "Invalid Product ID" });
    }
    const category = await Category.findById(req.body.category);

    if (!category) {
      return res.status(400).json({ message: "Invalid category" });
    }

    let product = await Product.findByIdAndUpdate(
      req.params.id,
      {
        name: req.body.name,
        description: req.body.description,
        richDescription: req.body.richDescription,
        image: req.body.image,
        brand: req.body.brand,
        price: req.body.price,
        category: req.body.category,
        countInStock: req.body.countInStock,
        rating: req.body.rating,
        numReviews: req.body.numReviews,
        isFeatured: req.body.isFeatured,
      },
      { new: true }
    );

    if (!product) {
      return res.status(404).json({ message: "The product cannot be updated" });
    }

    res.status(200).json({
      message: `${req.body.name} updated successfully`,
      product,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const productCategory = async (req, res) => {
  try {
    // Populate the 'category' field to get the complete category objects
    const products = await Product.find().populate("category");
    if (!products || products.length === 0) {
      return res.status(404).send("No products found");
    }

    // Extract the names from the populated category objects
    const categoryNames = products.map((product) => product.category.name);

    // Remove duplicate category names if needed
    const categories = [...new Set(categoryNames)];

    res.status(200).send(categories);
  } catch (error) {
    console.error("Error fetching product categories:", error);
    res.status(500).send("Internal Server Error");
  }
};

const searchProduct = async (req, res) => {
  const PAGE_SIZE = 3;
  try {
    const { query } = req;

    const pageSize = query.pageSize || PAGE_SIZE;
    const page = query.page || 1;
    const category = query.category || "";
    const brand = query.brand || "";
    const price = query.price || "";
    const rating = query.rating || "";
    const order = query.order || "";
    const searchQuery = query.searchQuery || "";

    const queryFilter =
      searchQuery && searchQuery !== "all"
        ? { name: { $regex: searchQuery, $options: "i" } }
        : {};
    const categoryFilter = category && category !== "all" ? { category } : {};
    const ratingFilter =
      rating && rating !== "all" ? { rating: { $gte: Number(rating) } } : {};
    const priceFilter =
      price && price !== "all"
        ? {
            price: {
              $gte: Number(price.split("-")[0]),
              $lte: Number(price.split("-")[1]),
            },
          }
        : {};

    const sortOrder =
      order === "featured"
        ? { featured: -1 }
        : order === "lowest"
        ? { price: 1 }
        : order === "highest"
        ? { price: -1 }
        : order === "toprated"
        ? { rating: -1 }
        : order === "newest"
        ? { createdAt: -1 }
        : { id: -1 };

    const queryOptions = {
      ...queryFilter,
      ...categoryFilter,
      ...priceFilter,
      ...ratingFilter,
    };

    const products = await Product.find(queryOptions)
      .sort(sortOrder)
      .skip(pageSize * (page - 1))
      .limit(pageSize);

    const countProducts = await Product.countDocuments(queryOptions);

    if (products.length === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.send({
      products,
      countProducts,
      page,
      pages: Math.ceil(countProducts / pageSize),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

const getCount = async (req, res) => {
  try {
    const productCount = await Product.countDocuments();

    if (productCount === 0) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ productCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const getFeaturedProducts = async (req, res) => {
  try {
    const count = req.params.count ? req.params.count : 0;
    const product = await Product.find({ isFeatured: true }).limit(+count);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const uploadGalleryImages = async (req, res) => {
  try {
    const basePath = `${req.protocol}://${req.get("host")}/public/upload`;
    let imagesPaths = [];

    uploadOptions.single("images")(req, res, async (err) => {
      if (err) {
        return res.status(500).json({ message: "Error uploading image" });
      }

      if (!mongoose.isValidObjectId(req.params.id)) {
        res.status(400).json({ message: "Invalid Product ID" });
      }

      const files = req.files;

      if (files) {
        imagesPaths = files.map((file) => {
          return `${basePath}/${file.filename}`;
        });
      }

      let product = await Product.findByIdAndUpdate(
        req.params.id,
        {
          images: imagesPaths,
        },
        { new: true }
      );

      if (!product) {
        return res
          .status(404)
          .json({ message: "The product cannot be updated" });
      }

      res.status(200).json({
        message: `${req.body.name} updated successfully`,
        product,
      });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
};

module.exports = {
  getProductList,
  addNewProduct,
  getProduct,
  getProductDetails,
  updateProduct,
  deleteProduct,
  getCount,
  getFeaturedProducts,
  uploadGalleryImages,
  productCategory,
  searchProduct,
};
