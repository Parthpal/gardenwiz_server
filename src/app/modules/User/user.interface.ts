import { Model, ObjectId } from "mongoose";
import { USER_ROLE, USER_STATUS } from "./user.constant";

export interface TUser {
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
    favoritePosts?:ObjectId[];
    ban:boolean;
    createdAt?: Date;
    updatedAt?: Date;
  };
  export interface IUserModel extends Model<TUser> {
    isUserExistsByEmail(id: string): Promise<TUser>;
    isPasswordMatched(
      plainTextPassword: string,
      hashedPassword: string
    ): Promise<boolean>;
    isUserBanned(email:string):Promise<boolean>;
    isJWTIssuedBeforePasswordChanged(
      passwordChangedTimestamp: Date,
      jwtIssuedTimestamp: number
    ): boolean;
  }

  export type TUserRole=keyof typeof USER_ROLE;