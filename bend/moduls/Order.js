const mongoose = require("mongoose");

const orderSchema = new mongoose.Schema({
    
    username:{
        type: String,
        // required: true,
        maxlength: 60 
    },
    address:{
        type: String,
        // required: true,
        maxlength: 200 
    },
    order_id:{
        type: String,
        
    },
    amount:{
        type: Number, 
        required: true,
    },
    razorpay_payment_id:{
        type: String,
        
    },
    razorpay_order_id:{
      type: String,
      
    },
    razorpay_signature:{
        type: String,
        
    },
    status:{
        type: Number, 
        default:0,
       
    },
    method:{
        type: Number,
    }   
}, { timestamps: true }); 

module.exports = mongoose.model('Order', orderSchema); 
