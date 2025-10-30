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
  origin: "http://localhost:5173",       // allow all origins
  credentials: true, // allows cookies/authorization headers if needed
}));

app.use(cookieParser());

app.use("/api/auth",auth);
app.use("/api/alllistings",alllistings);
app.use("/api/newlistings",newlistings);
app.use("/api/deletelistings",deletelistings);
app.use("/api/update",update);


app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
});
