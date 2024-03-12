const router = require("express").Router();

const Inventory = require("../../moduls/Inventory");

// Create a new product




router.post("/post", async (req, res) => {
    try {
        const newProduct = new Inventory(req.body);
        const savedProduct = await newProduct.save();
        res.status(200).json(savedProduct);
    } catch (err) {
        console.error("Error saving product:", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
});
router.get("/", async (req, res) => {
    try {
        const products = await Inventory.find();
        res.status(200).json(products);
    } catch (err) {
        res.status(500).json(err);
    }
});

router.get("/:id", async (req, res) => {
    try {
      const order = await Inventory.findById(req.params.id);
      res.status(200).json(order);
    } catch (err) {
      res.status(500).json(err);
    }
  });

  router.post("/:id", async (req, res) => {
    try {
      const updatedOrder = await Inventory.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;