import { Model, ObjectId } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user.constant";

export type TUser = {
    _id?: string;
    name: string;
    role: keyof typeof USER_ROLE;
    email: string;
    password: string;
    status: keyof typeof USER_STATUS;
    passwordChangedAt?: Date;
    profilePhoto?: string;
    followerIds?:ObjectId[];
    followingIds?:ObjectId[];
    createdAt?: Date;
    updatedAt?: Date;
  };
  export interface IUserModel extends Model<TUser> {
    isUserExistsByEmail(id: string): Promise<TUser>;
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string
    ): Promise<boolean>;
  }