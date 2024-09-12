import { User } from "../models/user.models.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken"


const jwtVerify = async(req, res , next) => {
    try {
       const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "");
      
       if(!token) {
        throw new ApiError(401, "Unauthorized request")
       }
       const decodedToken =  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)
       
       const user = await User.findById(decodedToken?._id).select(" -password -refreshToken")
      
       if(!user) {
        throw new ApiError(401, "Invalid access Token")
       }

       req.user = user;
       next();
    } catch (error) {
       return res.status(400)
       .json({
        message: "User is not authenticated",
        success: false
       })
    }

}

export {jwtVerify}