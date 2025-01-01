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
          followingIds: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
            default: []
          },
          followerIds: {
            type: [{ type: mongoose.Types.ObjectId, ref: 'User', required: true }],
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
    return await User.findOne({ email }).select('+password');
  };

  userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword
  ) {
    return await bcryptjs.compare(plainTextPassword, hashedPassword);
  };
  

export const User = model<TUser,IUserModel>('User', userSchema);