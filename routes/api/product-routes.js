const router = require("express").Router();
const { Product, Category, Tag, ProductTag } = require("../../models");

// GET all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.findAll({
      include: [Category, { model: Tag, through: ProductTag }],
    });
    res.json(products);
  } catch (err) {
    res.status(500).json(err);
  }
});

// GET a single product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByPk(req.params.id, {
      include: [Category, { model: Tag, through: ProductTag }],
    });
    if (!product) {
      res.status(404).json({ message: "No product found with this ID" });
      return;
    }
    res.json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// POST create a new product
router.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    if (req.body.tagIds) {
      await product.addTags(req.body.tagIds);
    }
    res.status(201).json(product);
  } catch (err) {
    res.status(400).json(err);
  }
});

// PUT update a product by ID
router.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!product[0]) {
      res.status(404).json({ message: "No product found with this ID" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

// DELETE a product by ID
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!product) {
      res.status(404).json({ message: "No product found with this ID" });
      return;
    }
    res.status(200).json(product);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
