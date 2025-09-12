import express from "express";
const app=express();
import  bodyParser from 'body-parser';
import cors from 'cors';
import cookieParser from "cookie-parser";
import auth from "./routes/auth.js";
import gameauth from "./routes/gameauth.js";

import dotenv from "dotenv";
dotenv.config();

import connectdb from "./config/db.js";
connectdb();

const PORT=process.env.PORT;
console.log("--PORT--",PORT);

//middleware
app.use(express.json());
app.use(bodyParser.json());//for parsing string from frontend
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true,
}))

app.use(cookieParser());
app.use("/auth",auth);
app.use("/gameauth",gameauth);

app.listen(PORT,()=>{
    console.log(`Server is running on PORT ${PORT}`)
});
