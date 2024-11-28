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
    createdAt?: Date;
    updatedAt?: Date;
  };

  