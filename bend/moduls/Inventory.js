const mongoose = require("mongoose");

const InventorySchena =  new mongoose.Schema ({
    bases:{
        type :Number,
        required:true

    },
    extras:{
        type :Number,
        required:true
    }
});

module.exports =  mongoose.model ('Inventory',InventorySchena )