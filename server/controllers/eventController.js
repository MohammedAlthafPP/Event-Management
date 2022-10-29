const ErrorHander = require("../utils/errorhandler");
const catchAsyncError = require("../middlewares/catchAsyncError");
const Event = require('../models/eventModel');
const cloudinary = require("cloudinary");

// Adding Bride Details
exports.createBride = catchAsyncError(async (req, res, next) => {
    if(!req.body.avatar){
        return next(new ErrorHander("Add a Image", 404));
    }
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "bride",
        width: 350,
        crop: "scale",
      });
   
    const { name, age, address, father,country  } = req.body;
    const event = await Event.create({
        brideDetails:{
        name,
        age,
        address,
        father,
        country,
        avatar: {
            public_id: myCloud.public_id,
            url: myCloud.secure_url,
          },

        }

    });
   
    req.session.eventId = event._id;
    res.status(201).json({
        success: true,
        message: "Successfully added bride's details",
        event,
      });
 
});


// Adding Groom Details
exports.createGroom = catchAsyncError(async (req, res, next) => {
    if(!req.body.avatar){
        return next(new ErrorHander("Add a Image", 404));
    }
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "groom",
        width: 350,
        crop: "scale",
      });
   
    const { name, age, address, father,country  } = req.body;
    const id =req.session.eventId;
    if(!id){
        return next(new ErrorHander("Event not found", 404));
    }
    await Event.updateOne({_id:id},{$set:{
        groomDetails : {
            name,
            age,
            address,
            father,
            country,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            },

        }
    }})
    res.status(201).json({
        success: true,
        message: "Successfully added groom's details",
      });
 
});


// Adding marriage Details
exports.addMarriageInfo = catchAsyncError(async (req, res, next) => {
    if(!req.body.avatar){
        return next(new ErrorHander("Add a Image", 404));
    };
    const myCloud = await cloudinary.v2.uploader.upload(req.body.avatar, {
        folder: "marriage",
        width: 650,
        crop: "scale",
      });
      
    const {venu, address,date} = req.body;
    const id =req.session.eventId;
    if(!id){
        return next(new ErrorHander("Event not found", 404));
    }
    
    if(!id){
        return next(new ErrorHander("Event not found", 404));
    }
    await Event.updateOne({_id:id},{$set:{
        marriageDetails : {
            venu,
            address,
            date,
            avatar: {
                public_id: myCloud.public_id,
                url: myCloud.secure_url,
            }
        },
        createdOn:Date.now()
    }})
    res.status(201).json({
        success: true,
        message: "Details of marriage added successfully",
      });
 
});


// Delete Event 
exports.deleteEvent = catchAsyncError(async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    if(!event){
        return next(new ErrorHander("Event not found", 404));
    }
    //Remove from Cloudinary
     const groomimg = event.groomDetails?.avatar[0]?.public_id ?? null;
     const brideimg = event.brideDetails?.avatar[0]?.public_id ?? null ;
     const marriageimg = event.marriageDetails?.avatar[0]?.public_id ?? null;
     const arr = [groomimg,brideimg,marriageimg];
     arr.forEach(async(item)=>{
        if(item !== null){
            await cloudinary.v2.uploader.destroy(item);
        }
     })
    
   

    const users = `${event.brideDetails?.name ?? ""} and ${event.groomDetails?.name ?? ""}`
    await event.remove();
    res.status(201).json({
        success: true,
        message: `${users}'s wedding event details has been deleted`,
      });
 
});



// Get All Events
exports.getAllEvents = catchAsyncError(async (req, res, next) => {
    const events = await Event.find().sort({createdOn:-1});

    res.status(201).json({
        success: true,
        events
      });
 
});


// Get single Event Details
exports.eventDeatils = catchAsyncError(async (req, res, next) => {
    const event = await Event.findById(req.params.id);
    if(!event._id){
        return next(new ErrorHander("Event not found with this Id", 404));
    }

    res.status(201).json({
        success: true,
        event
      });
 
});