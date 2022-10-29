const express = require('express');
const app = express();
const erroeMiddleware = require("./middlewares/error");
const cookieParser = require("cookie-parser");
const dotenv = require('dotenv');
const cors = require ("cors")
const bodyparser = require("body-parser");
const fileUpload = require("express-fileupload");
const session = require('express-session')


app.use(
  cors({
      origin: ["http://localhost:3000"],
      method : ["GET","POST","PUT","DELETE"],
      credentials: true,
  })
);

//config 
dotenv.config({path:"./.env"});

app.use(express.json());
app.use(cookieParser());
app.use(bodyparser.urlencoded({extended:true}))
app.use(fileUpload({useTempFiles: true}));
app.use(session({
    secret:process.env.SESSION_SECRET_KEY,
    cookie:{maxAge:process.env.SESSION_EXPIRE*24*60*60*1000},
    saveUninitialized:true,
    resave: false,
  }));

// Import Route
const Event = require('./routes/eventRoute')
const User = require('./routes/userRoute')

app.use('/api/v4',Event);
app.use('/api/v4',User);

//MiddlewRware for Errors
app.use(erroeMiddleware);



module.exports = app;