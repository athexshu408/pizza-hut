const router = require("express").Router();
const Order = require("../../moduls/Order"); // Assuming your Mongoose Order model is defined in 'moduls/Order.js'
 const crypto = require("crypto");
const Razorpay = require("razorpay");

const razorpay = new Razorpay({
  key_id: "rzp_test_2Ean0CEjzlgpfJ",
  key_secret: "s0oLn0MHWfDbhzOMTsS5FKKX",
});



router.post('/create-order', async (req, res) => {
  const options = {
      amount: req.body.amount * 100,
      
     // amount in paise
      currency: 'INR',
      receipt: 'receipt_order_12345',
      payment_capture: 1 // auto capture
  };
  try {
      const response = await razorpay.orders.create(options);
      res.json(response);
  } catch (error) {
      console.log(error);
      res.status(500).send('Something went wrong');
  }
});


// payemnt verification
router.post('/payment-success', async (req, res) => {
  try {
    const { order_id, razorpay_payment_id, razorpay_signature, amount,username,address } = req.body;
    const expectedSignature = crypto
      .createHmac('sha256','s0oLn0MHWfDbhzOMTsS5FKKX' )
      .update(order_id + '|' + razorpay_payment_id)
      .digest('hex');
    if (expectedSignature !== razorpay_signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
    const payment = new Order({
      order_id,
      razorpay_payment_id,
      razorpay_signature,
      amount,
      address,
      username,
      // status: 'success'
    });
    await payment.save();
    res.status(200).send('Payment success');
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ error: 'Something went wrong' });
  }
});


//  console.log(body.json.order_id)

  



router.post("/post", async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    const savedOrder = await newOrder.save();
    res.status(200).json(savedOrder);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/", async (req, res) => {
  try {
    const orders = await Order.find();
    res.status(200).json(orders);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    res.status(200).json(order);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get('/order', async (req, res) => {
  try {
    const razorpayPaymentId = req.query.reference;
    if (!razorpayPaymentId) {
      return res.status(400).json({ error: 'Razorpay payment ID parameter is missing' });
    }
    
    // Find the order with the given razorpay_payment_id
    const order = await Order.findOne({ razorpay_payment_id: razorpayPaymentId });
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    res.json(order);
  } catch (error) {
    console.error('Error fetching order:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});
router.get('/order/:razorpay_payment_id', async (req, res) => {
  try {
    const { razorpay_payment_id } = req.params;
    const order = await Order.findOne({ razorpay_payment_id: razorpay_payment_id }).exec();
    if (order) {
      res.json(order);
    } else {
      res.status(404).json({ message: 'Order not found' });
    }
  } catch (error) {
    console.error('Error retrieving order:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});
router.put("/:id", async (req, res) => {
  const orderId = req.params.id;
  const { status } = req.body;

  try {
    // Validate status value here if necessary

    const updatedOrder = await Order.findByIdAndUpdate(orderId, { status }, { new: true });

    if (!updatedOrder) {
      return res.status(404).json({ error: "Order not found" });
    }

    res.status(200).json(updatedOrder);
  } catch (err) {
    console.error("Error updating order status:", err);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    await Order.findByIdAndDelete(req.params.id);
    res.status(200).json("Order deleted successfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
