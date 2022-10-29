const app = require('./app');
const dotenv = require('dotenv');
const connectDatabase = require('./config/database');
const cloudinary = require("cloudinary");

//config 
dotenv.config({path:"./.env"});

//connecting Database
connectDatabase();

// config cloudinary
cloudinary.config({
    cloud_name : process.env.CLOUDINARY_NAME,
    api_key : process.env.CLOUDINARY_API_KEY,
    api_secret : process.env.CLOUDINARY_API_SECRET,

})

//server Running
const PORT = process.env.PORT || 4001;
app.listen(PORT,()=>{
    console.log(`Server running at: http://localhost:${PORT}/`);
})