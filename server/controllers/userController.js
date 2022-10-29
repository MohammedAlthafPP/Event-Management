const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const User = require('../models/userModel');
const cloudinary = require("cloudinary");
const sendToken = require('../utils/jwtToken');



//Register 
exports.registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email,password } = req.body;
    const isUser = await User.findOne({ email });
    if (isUser) {
      return next(new ErrorHander("Account already exists", 402));
    }
    if(email == process.env.ADMIN_MAIL){
        const user = await User.create({
            name,
            email,
            password,
            role:"admin"
          });

          res.status(201).json({
            success: true,
            message : "Admin Record Created",
            user
          });

    }else {
        return next(new ErrorHander("Access denied ", 403));
    }

});

//Login 
exports.loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return next(new ErrorHander("Please Enter Email and Password", 404));
    }
  
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new ErrorHander("Invalid Email or Password", 401));
    }
  
    const isPasswordMatch = await user.comparePassword(password);
    if (!isPasswordMatch) {
      return next(new ErrorHander("Invalid Email or Password", 401));
    }
    const message =`Hi ${user.name}, you are Logged in Successfully`
    sendToken(user, 200, res,message);
});

//Get User Details
exports.getUserDetails = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return next(new ErrorHander("user not found", 404));
  }
  
  res.status(200).json({
    success: true,
    user,
  });
});

//Logout 
exports.logout = catchAsyncError(async (req, res, next) => {
    res.cookie("token", null, {
      expires: new Date(Date.now()),
      httpOnly: true,
    });
  
    res.status(200).json({
      success: true,
      message: "Logged Out",
    });
});