import { NextFunction, Request, Response } from "express";
import { catchAsync } from "../utils/catchAsync";
import jwt, { JwtPayload } from "jsonwebtoken";
import config from "../config";
import { TUser, TUserRole } from "../modules/User/user.interface";
import { User } from "../modules/User/user.model";
import { verifyToken } from "../utils/verifyJWT";

export const auth = (...requiredRoles:TUserRole[]) => {
    return catchAsync(async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers.authorization;

        // checking if the token is missing
        if (!token) {
            throw new Error("You are not an authorized user");
        }
    
        const decoded = verifyToken(
          token,
          config.jwt_access_secret as string
        ) as JwtPayload;
    
        const { role, email, iat } = decoded;
    
        // checking if the user is exist
        const user = await User.isUserExistsByEmail(email);
    
        if (!user) {
           throw new Error("This user is not found");
        }
        if (
            user.passwordChangedAt &&
            User.isJWTIssuedBeforePasswordChanged(
              user.passwordChangedAt,
              iat as number
            )
          ) {
            throw new Error("You are not an authorized user");
          }
          req.user = decoded as JwtPayload;
          next();
    });
  };