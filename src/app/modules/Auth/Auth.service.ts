import httpStatus from "http-status";
import { User } from "../User/user.model";
import { TUserLogin, TUserRegister } from "./Auth.interface";
import { USER_ROLE } from "../User/user.constant";
import config from "../../config";
import { createToken } from "../../utils/verifyJWT";
import { sendImageToCloudanary } from "../../utils/sendImageToCloudinary";
import jwt,{ JwtPayload } from "jsonwebtoken";
import bcrypt from 'bcryptjs';
import { EmailHelper } from "../../utils/emailSender";
import { response } from "express";
const registerUser = async (payload: TUserRegister) => { 
    // checking if the user is exist
    const user = await User.isUserExistsByEmail(payload?.email);
    if (user) {
        return {
            success:false,
            statusCode:httpStatus.BAD_REQUEST,
            message:'User is already exist'
        };
    }
    payload.role = USER_ROLE.USER;
    console.log(payload);
    const newUser=await User.create(payload);

 //create token and sent to the  client
  const jwtPayload = {
    _id: newUser._id,
    name: newUser.name,
    email: newUser.email,
    profilePhoto: newUser.profilePhoto,
    role: newUser.role,
    status: newUser.status,
    followerIds:newUser.followerIds,
    followingIds:newUser.followingIds
  };
  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );
  const refreshToken = createToken(
    jwtPayload,
    config.jwt_refresh_secret as string,
    config.jwt_refresh_expires_in as string
  );
  return {
    accessToken,
    refreshToken,
  };
}
const loginUser = async (payload: TUserLogin) => {
  const user = await User.isUserExistsByEmail(payload?.email);
    if (!user) {
      throw new Error("User does not exist");
    }
    const isBanned = await User.isUserBanned(payload?.email);
    if (isBanned) {
      const error = new Error("Account is banned") as any;
      error.statusCode = 403; // Set status code for forbidden access
      throw error;
    }
    //checking if the password is correct
    if (!(await User.isPasswordMatched(payload?.password, user?.password))){
    throw new Error("Password does not match");
    }
// creating token and sending to the client
    const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePhoto: user.profilePhoto,
    role: user.role,
    status: user.status,
    followerIds:user.followerIds,
    followingIds:user.followingIds
    };

    // creation of token
    // Secret key generation: require('crypto').randomBytes(32).toString('hex')
    const accessToken = createToken(
      jwtPayload,
      config.jwt_access_secret as string,
      config.jwt_access_expires_in as string
    );
    const refreshToken = createToken(
      jwtPayload,
      config.jwt_refresh_secret as string,
      config.jwt_refresh_expires_in as string
    );
    return {
      accessToken,
      refreshToken,
    };
}

const changePasswordS=async (userData:JwtPayload,payload:{oldPassword:string,newPassword:string})=>{
    // checking if the user is exist
    const user = await User.isUserExistsByEmail(userData.email);

    if (!user) {
      throw new Error("User does not exist");
    }
    const isBanned = await User.isUserBanned(userData.email);
    if (isBanned) {
      const error = new Error("Account is banned") as any;
      error.statusCode = 403; // Set status code for forbidden access
      throw error;
    }
    //checking if the password is correct
    if (!(await User.isPasswordMatched(payload.oldPassword, user?.password)))
      throw new Error("Password does not match");
  
    //hash new password
    const newHashedPassword = await bcrypt.hash(
      payload.newPassword,
      Number(config.bcrypt_salt_rounds)
    );
  
    await User.findOneAndUpdate(
      {
        email: userData.email,
      },
      {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
      }
    );  
    return null;
}

const refreshTokenS = async (token: string) => {
  // checking if the given token is valid
  const decoded = jwt.verify(
    token,
    config.jwt_refresh_secret as string
  ) as JwtPayload;

  const { email, iat } = decoded;

  // checking if the user is exist
  const user = await User.isUserExistsByEmail(email);

  if (!user) {
    throw new Error("User does not exist");
  }
  const isBanned = await User.isUserBanned(email);
  if (isBanned) {
    const error = new Error("Account is banned") as any;
    error.statusCode = 403; // Set status code for forbidden access
    throw error;
  }

  if (
    user.passwordChangedAt &&
    User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat as number)
  ) {
    throw new Error("You are not authorized !");
  }

  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePhoto: user.profilePhoto,
    role: user.role,
    status: user.status,
    followerIds:user.followerIds,
    followingIds:user.followingIds
    };

  const accessToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    config.jwt_access_expires_in as string
  );

  return {
    accessToken,
  };
};
const forgetPasswordS=async(email:string)=>{
    // checking if the user is exist
    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new Error("User does not exist");
    }
    const isBanned = await User.isUserBanned(email);
    if (isBanned) {
      const error = new Error("Account is banned") as any;
      error.statusCode = 403; // Set status code for forbidden access
      throw error;
    }
  
  const jwtPayload = {
    _id: user._id,
    name: user.name,
    email: user.email,
    profilePhoto: user.profilePhoto,
    role: user.role,
    status: user.status,
    followerIds:user.followerIds,
    followingIds:user.followingIds
    };
  const resetToken = createToken(
    jwtPayload,
    config.jwt_access_secret as string,
    '10m'
  );
  const resultUILink=`${config.client_url}/ResetPasswordPage?email=${email}&token=${resetToken}`
  const htmlContent=resultUILink;
  const subject='Reset your password within 10 minutes';
  const email2='parthapal.ctg@gmail.com'
  EmailHelper.sendEmail(email,htmlContent,subject)
  console.log(resultUILink);
}
const resetPasswordS=async(email:string,newPassword:string,token:any)=>{
 // console.log(email,newPassword,token);
    // checking if the given token is valid
    const decoded = jwt.verify(
      token,
      config.jwt_access_secret as string
    ) as JwtPayload;
  
    const { email:decodedEmail, iat } = decoded;
    //Checking decoded user email and provided email matched or not
    if(decodedEmail!==email){
      throw new Error("User does not exist");
    }
    //Checking if the user is exist
    const user = await User.isUserExistsByEmail(email);

    if (!user) {
      throw new Error("User does not exist");
    }
    const isBanned = await User.isUserBanned(email);
    if (isBanned) {
      const error = new Error("Account is banned") as any;
      error.statusCode = 403; // Set status code for forbidden access
      throw error;
    }
    //hash new password
    const newHashedPassword = await bcrypt.hash(
      newPassword,
      Number(config.bcrypt_salt_rounds)
    );
    
      await User.findOneAndUpdate(
        {
          email: email,
        },
        {
          password: newHashedPassword,
          passwordChangedAt: new Date(),
        }
      ); 
return null
}
export const AuthServices = {
    registerUser,
    loginUser,
    changePasswordS,
    refreshTokenS,
    forgetPasswordS,
    resetPasswordS
  };