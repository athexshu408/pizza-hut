const router = require("express").Router();

const Inventory = require("../../moduls/Inventory");
const nodemailer = require('nodemailer');

// Nodemailer transporter setup
 let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false,
    auth: {
      user: 'vernie.mosciski@ethereal.email',
      pass: 'CFmjTGBVTW3XfHSvaN',
    },
  });

// Helper function to send email notification
async function sendEmailNotification(order) {
    const mailOptions = {
        from: 'atharvingale408@gmail.com',
        to: 'atharvingale408@gmail.com',
        subject: 'Inventory Update Alert',
        text: `Inventory update alert for order ${order._id}: Bases: ${order.bases}, Extras: ${order.extras}`
    };

    await transporter.sendMail(mailOptions);
    console.log(`Email notification sent for order ID: ${order._id}`);
}

// Update an existing product
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

      if (updatedOrder.bases <= 20 || updatedOrder.extras <= 20) {
        // Send email notification
        await sendEmailNotification(updatedOrder);
    }
      res.status(200).json(updatedOrder);
    } catch (err) {
      res.status(500).json(err);
    }
  });
  
module.exports = router;