const router = require("express").Router();
const Product = require("../../moduls/Product");

// Create a new product




router.post("/post", async (req, res) => {
    try {
        const newProduct = new Product(req.body);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        console.error("Error saving product:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});

// Retrieve all products
router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Retrieve a specific product by ID
router.get("/:id", async (req, res) => {
    try {
        const product = await Product.findById(req.params.id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Update a product
router.put("/:id", async (req, res) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.status(200).json(updatedProduct);
    } catch (err) {
        res.status(500).json(err);
    }
});

// Delete a product
router.delete("/:id", async (req, res) => {
    try {
        await Product.findByIdAndDelete(req.params.id);
        res.status(200).json("Product deleted successfully");
    } catch (err) {
        res.status(500).json(err);
    }
});

module.exports = router;
