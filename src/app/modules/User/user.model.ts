import mongoose, { model, Schema } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user.constant";
import { IUserModel, TUser } from "./user.interface";
import config from "../../config";
import bcryptjs from 'bcryptjs';

const userSchema=new Schema<TUser,IUserModel>(
    {
        name:{
            type:String,
            required:true,
        },
        role: {
            type: String,
            enum: Object.keys(USER_ROLE),
            required: true,
          },
          email: {
            type: String,
            required: true,
            //validate email
            match: [
              /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
              'Please fill a valid email address',
            ],
          },
          password: {
            type: String,
            required: true,
            select: 0,
          },
          status: {
            type: String,
            enum: Object.keys(USER_STATUS),
            default: USER_STATUS.BASIC,
          },
          passwordChangedAt: {
            type: Date,
          },
          profilePhoto: {
            type: String,
            default: null
          },
          ban: { type: Boolean, default: false },
          followingIds: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
            default: []
          },
          followerIds: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
            default: []
          },  
          favoritePosts: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'Post', required: true }],
            default: []
          },  
    }
)

userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this; // doc
    // hashing password and save into DB
  
    user.password = await bcryptjs.hash(
      user.password,
      Number(config.bcrypt_salt_rounds)
    );
  
    next();
  });

  userSchema.statics.isUserExistsByEmail = async function (email: string) {
    //console.log(email,'email validate');
    return await User.findOne({ email }).select('+password').populate([
      {
        path: 'followingIds',
        select: '_id name profilePhoto', // Fetch specific fields
      },
      {
        path: 'followerIds',
        select: '_id name profilePhoto', // Fetch specific fields
      },
    ]);
  };
// Static method to check if user is banned
userSchema.statics.isUserBanned = async function (email: string) {
  const user = await this.findOne({ email });
  return user ? user.ban : false;
};
  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword
  ) {
    return await bcryptjs.compare(plainTextPassword, hashedPassword);
  };
 // This function helps to prevent the use of old JWTs (JSON Web Tokens) if the user has changed their password.
  userSchema.statics.isJWTIssuedBeforePasswordChanged = function (
    passwordChangedTimestamp: number,
    jwtIssuedTimestamp: number
  
  ) {
    const passwordChangedTime =
    new Date(passwordChangedTimestamp).getTime() / 1000;
    return passwordChangedTime > jwtIssuedTimestamp;
  };
  

export const User = model<TUser,IUserModel>('User', userSchema);