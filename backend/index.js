import dotenv from "dotenv";
dotenv.config();
import express from "express";

const app=express();
import path from "path";

import { fileURLToPath } from "url";

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


const allowedOrigins=["http://localhost:5173","https://wanderlust-backend-bis1.onrender.com"]
//middleware
app.use(express.json());
app.use(bodyParser.json());//for parsing string from frontend
app.use(cors({
  origin: function(origin,callback){
    if(!origin) return callback(null,true);
    if(allowedOrigins.includes(origin)){
      return callback(null,true);
    }else{
      return callback(new Error("Not allowed by CORS"));
    }
  },       // allow all origins
  credentials: true, // allows cookies/authorization headers if needed
}));

app.use(cookieParser());

app.use("/api/auth",auth);
app.use("/api/alllistings",alllistings);
app.use("/api/newlistings",newlistings);
app.use("/api/deletelistings",deletelistings);
app.use("/api/update",update);

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, "dist")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "dist", "index.html"));
});

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
});
