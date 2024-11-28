import { model, Schema } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user.constant";
import { TUser } from "./user.interface";
import config from "../../config";
import bcryptjs from 'bcryptjs';

const userSchema=new Schema<TUser>(
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

export const User = model<TUser>('User', userSchema);