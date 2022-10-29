const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please Enter your Name"],
  },
  email: {
    type: String,
    required: [true, "Please Enter your Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter your Password"],
    minLength: [8, "Password should have more than 8 charectors"],
    select: false,
  },
  role:{
    type:String,
  },

});

userSchema.pre("save", async function(next){

  if(!this.isModified("password")){
      next();
  }

  this.password = await bcrypt.hash(this.password,10);
});

//JWT TOKEN
userSchema.methods.getJWTToken = function(){
  return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
  })
}

//Compare Password
userSchema.methods.comparePassword = async function(enteredPassword){
  return await bcrypt.compare(enteredPassword,this.password)

};



module.exports = mongoose.model("user",userSchema);