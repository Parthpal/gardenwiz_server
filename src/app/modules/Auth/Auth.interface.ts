import { USER_ROLE } from "../User/user.constant";

export type TUserRegister= {
    name: string;
    email: string;
    password: string;
    role: keyof typeof USER_ROLE;
}
export type TUserLogin= {
    email: string;
    password: string;
}
