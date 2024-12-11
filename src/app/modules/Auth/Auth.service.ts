import httpStatus from "http-status";
import { User } from "../User/user.model";
import { TUserLogin, TUserRegister } from "./Auth.interface";
import { USER_ROLE } from "../User/user.constant";
import config from "../../config";
import { createToken } from "../../utils/verifyJWT";
import { sendImageToCloudanary } from "../../utils/sendImageToCloudinary";

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
    
  // checking if the user is exist
  const user = await User.isUserExistsByEmail(payload?.email);
  if (!user) {
      return {
          success:false,
          statusCode:httpStatus.BAD_REQUEST,
          message:'User does not exist'
      };
  }
    console.log(user);
    console.log(payload);

    //checking if the password is correct
    if (!(await User.isPasswordMatched(payload?.password, user?.password))){
      return {
        success:false,
        statusCode:httpStatus.FORBIDDEN,
        message:'Password do not matched'
    };
    }

const jwtPayload = {
  _id: user._id,
  name: user.name,
  email: user.email,
  profilePhoto: user.profilePhoto,
  role: user.role,
  status: user.status,
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
export const AuthServices = {
    registerUser,
    loginUser
  };