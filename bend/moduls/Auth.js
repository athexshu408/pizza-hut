const mongoose = require("mongoose")


const UserSchema = new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true

        //username cant be same 
    },
    otp:{
        type:String,
        
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
      
    },profilePic:{
        type:String,
        default:""
    },
   address:{
    type:String,
    required:true,
   },
    
    
    
},{
    timestamps:true
});

module.exports = mongoose.model("Auth",UserSchema)