import dotenv from "dotenv";
dotenv.config();
import express from "express";
const app=express();

import  bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import alllistings from "./routes/listings.js";
import newlistings from "./routes/newlist.js";
import deletelistings from "./routes/deletelisting.js";

import update from "./routes/update.js";



import connectdb from "./config/db.js";
connectdb();

const PORT=process.env.PORT;
console.log("--PORT--",PORT);

//middleware
app.use(express.json());
app.use(bodyParser.json());//for parsing string from frontend
app.use(cors({
  origin: "*",       // allow all origins
  credentials: true, // allows cookies/authorization headers if needed
}));

app.use(cookieParser());
app.use("/test",(req,res)=>{
    res.status(200).json({text:"Hello"})
})
app.use("/auth",auth);
app.use("/alllistings",alllistings);
app.use("/newlistings",newlistings);
app.use("/deletelistings",deletelistings);
app.use("/update",update);


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
});
