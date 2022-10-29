const mongoose  = require("mongoose");


const eventSchema = new mongoose.Schema({
    brideDetails :{
        name : { 
            type:String , 
            required : true,
        },
        address : { 
            type:String , 
            required : true,
        },
        age : { 
            type:Number , 
            required : true,
        },
        father : { 
           type:String ,
            required : true,
        },
        country : { 
           type:String ,
            required : true,
        },
        avatar: [
            {
              public_id: {
                type: String,
                required:true,
              },
              url: {
                type: String,
                required:true,
              },
            },
          ],
    },
    groomDetails :{
        name : { 
            type:String , 
        },
        address : { 
            type:String , 
        },
        age : { 
            type:Number , 
        },
        father : { 
           type:String ,
        },
        country : { 
           type:String ,
        },
        avatar: [
            {
              public_id: {
                type: String,
              },
              url: {
                type: String, 
              },
            },
          ],

    },
    marriageDetails :{
        venu : { 
            type:String , 
        },
        address : { 
            type:String , 
        },
        date : { 
            type:Date , 
        },
        avatar: [
            {
              public_id: {
                type: String,
              },
              url: {
                type: String, 
              },
            },
          ],
    },
    createdOn :{
        type:Date,
        
    }
   
     
});

module.exports = mongoose.model("Event",eventSchema);