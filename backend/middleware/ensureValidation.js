import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

export const validAuthentication = (req, res, next) => {
  //get the refreshToken and accessToken from cookies
  const accessToken = req.cookies["accessToken"];
  const refreshToken = req.cookies["refreshToken"];

  //check
  if (!accessToken && !refreshToken) {
    return res
      .status(401)
      .json({ message: "Unauthorized User!", success: false });
  }

  //if either accessToken or refreshToken exist then verify user

  try {
    const decodedToken = jwt.verify(accessToken, process.env.JWT_SECRET_KEY); //got the payload fromn the accesstoken
    req.user = decodedToken;

    console.log("decodedToken---", decodedToken);
    console.log(" req.user---", req.user);
    next(); //go to next request
  } catch (err) {
    console.log("Error in validAuthentication----", err); //jwt may have expired

    //if there is no refreshToken
    if (!refreshToken) {
      console.log("Refresh Token not exist");

      return res
        .status(403)
        .json({ message: "Forbidden", success: false, Error: err.message });
    }
    //if there is  refreshToken so verify refreshToken
    try {
      const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_KEY); //got the payload
      console.log("decoded payload from refresh Token----", decoded);

      //Now generate newAccessToken
      const newAccessToken = jwt.sign(
        {
        email:decoded?.email, 
        phoneNumber:decoded?.phoneNumber,
        _id:decoded?._id
        },
        process.env.JWT_SECRET_KEY,
        {
          expiresIn: "5m",
        }
      );
      const newRefreshToken = jwt.sign(
        {
        email:decoded?.email, 
        phoneNumber:decoded?.phoneNumber,
        _id:decoded?._id
        },
        process.env.JWT_REFRESH_KEY,
        {
          expiresIn: "7m",
        }
      );

      res.cookie("refreshToken",newRefreshToken,{
        httpOnly:true,
        sameSite:"strict",
        secure:false,

      });

      res.cookie("accessToken",newAccessToken,{
        httpOnly:true,
        sameSite:"strict",
        secure:false,

      });

      req.user=decoded;
      console.log("req.user from middleware--",req.user);

      next();
      
    } catch (error) {
      console.log("Error in Refresh Token--", error.message);

      return res
        .status(400)
        .json({ message: "Error in refreshToken", success: false });
    }
  }
};
