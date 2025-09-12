import User from "../model/user.js";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const signup = async (req, res) => {
  try {
    const { name, email, phoneNumber } = req.body;
    const existingUser = await User.findOne({ phoneNumber });

    console.log("existingUser from signup", existingUser?.phoneNumber);

    //if user exist
    if (existingUser) {
      return res
        .status(409)
        .json({ message: "User already Exist", success: false });
    }
    //create new document
    const newUser = new User({ name, email, phoneNumber });

    //save the newUser
    await newUser.save();

    const token= jwt.sign(
      {
        email: newUser?.email,
        phoneNumber: newUser?.phoneNumber,
        _id: newUser?._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );

    //Now generate Refresh Token
    const refreshToken = jwt.sign(
      {
        email: newUser?.email,
        phoneNumber: newUser?.phoneNumber,
        _id:newUser?._id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "7m" }
    );

    res.header("Access-Control-Allow-Credentials", "true");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });



    res.status(201).json({ message: "Registered Successfully", success: true,user:{
     email: newUser?.email,
     userId:newUser?._id,
     phoneNumber:newUser?.phoneNumber

    }});
  } catch (err) {
    res.status(500).json({
      message: "Internal Server Error",
      success: false,
      error: err.message,
    });
  }
};

export const login = async (req, res) => {
  try {
    const { phoneNumber } = req.body;
    console.log("phoneNumber from req.body",phoneNumber);
    if (!phoneNumber) {
      return res.status(400).json({
        message: "Phone number is required",
        success: false,
      });
    }
    const existingUser = await User.findOne({ phoneNumber }); //got full user details
    console.log("existingUser from login", existingUser);

    // If user not exist
    if (!existingUser) {
      return res
        .status(404)
        .json({ message: "User Not Found", success: false });
    }

    //else generate token
    const token= jwt.sign(
      {
        email: existingUser?.email,
        phoneNumber: existingUser?.phoneNumber,
        _id: existingUser?._id,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "5m" }
    );

    //Now generate Refresh Token
    const refreshToken = jwt.sign(
      {
        email: existingUser?.email,
        phoneNumber: existingUser?.phoneNumber,
        _id: existingUser?._id,
      },
      process.env.JWT_REFRESH_KEY,
      { expiresIn: "7m" }
    );

    res.header("Access-Control-Allow-Credentials", "true");

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    res.cookie("accessToken", token, {
      httpOnly: true,
      sameSite: "strict",
      secure: false,
    });

    res.status(200).json({
      message: "Login Successful",
      success: true,
      
      user: {
        email: existingUser?.email,
        userId: existingUser?._id,
        phoneNumber: existingUser?.phoneNumber,
      },
    });
  } catch (error) {
    console.log("Error from login route", error);
    res.status(500).json({
      message:"Internal Server Error",
      success:false,
      error:error.message,
    });
  }
};
