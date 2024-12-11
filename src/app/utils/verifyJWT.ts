import { USER_ROLE, USER_STATUS } from "../modules/User/user.constant";
import jwt, { JwtPayload } from 'jsonwebtoken';

export const createToken = (
    jwtPayload: {
      _id?: string;
      name: string;
      email: string;
      role: keyof typeof USER_ROLE;
      status: keyof typeof USER_STATUS;
    },
    secret: string,
    expiresIn: string
  ) => {
    return jwt.sign(jwtPayload, secret, {
      expiresIn,
    });
  };