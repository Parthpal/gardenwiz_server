"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthServices = void 0;
const http_status_1 = __importDefault(require("http-status"));
const user_model_1 = require("../User/user.model");
const user_constant_1 = require("../User/user.constant");
const config_1 = __importDefault(require("../../config"));
const verifyJWT_1 = require("../../utils/verifyJWT");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const emailSender_1 = require("../../utils/emailSender");
const registerUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    if (user) {
        return {
            success: false,
            statusCode: http_status_1.default.BAD_REQUEST,
            message: 'User is already exist'
        };
    }
    payload.role = user_constant_1.USER_ROLE.USER;
    console.log(payload);
    const newUser = yield user_model_1.User.create(payload);
    //create token and sent to the  client
    const jwtPayload = {
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePhoto: newUser.profilePhoto,
        role: newUser.role,
        status: newUser.status,
        followerIds: newUser.followerIds,
        followingIds: newUser.followingIds
    };
    const accessToken = (0, verifyJWT_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, verifyJWT_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = yield user_model_1.User.isUserExistsByEmail(payload === null || payload === void 0 ? void 0 : payload.email);
    if (!user) {
        throw new Error("User does not exist");
    }
    const isBanned = yield user_model_1.User.isUserBanned(payload === null || payload === void 0 ? void 0 : payload.email);
    if (isBanned) {
        const error = new Error("Account is banned");
        error.statusCode = 403; // Set status code for forbidden access
        throw error;
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload === null || payload === void 0 ? void 0 : payload.password, user === null || user === void 0 ? void 0 : user.password))) {
        throw new Error("Password does not match");
    }
    // creating token and sending to the client
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        role: user.role,
        status: user.status,
        followerIds: user.followerIds,
        followingIds: user.followingIds
    };
    // creation of token
    // Secret key generation: require('crypto').randomBytes(32).toString('hex')
    const accessToken = (0, verifyJWT_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    const refreshToken = (0, verifyJWT_1.createToken)(jwtPayload, config_1.default.jwt_refresh_secret, config_1.default.jwt_refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
const changePasswordS = (userData, payload) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(userData.email);
    if (!user) {
        throw new Error("User does not exist");
    }
    const isBanned = yield user_model_1.User.isUserBanned(userData.email);
    if (isBanned) {
        const error = new Error("Account is banned");
        error.statusCode = 403; // Set status code for forbidden access
        throw error;
    }
    //checking if the password is correct
    if (!(yield user_model_1.User.isPasswordMatched(payload.oldPassword, user === null || user === void 0 ? void 0 : user.password)))
        throw new Error("Password does not match");
    //hash new password
    const newHashedPassword = yield bcryptjs_1.default.hash(payload.newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({
        email: userData.email,
    }, {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
    });
    return null;
});
const refreshTokenS = (token) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the given token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_refresh_secret);
    const { email, iat } = decoded;
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(email);
    if (!user) {
        throw new Error("User does not exist");
    }
    const isBanned = yield user_model_1.User.isUserBanned(email);
    if (isBanned) {
        const error = new Error("Account is banned");
        error.statusCode = 403; // Set status code for forbidden access
        throw error;
    }
    if (user.passwordChangedAt &&
        user_model_1.User.isJWTIssuedBeforePasswordChanged(user.passwordChangedAt, iat)) {
        throw new Error("You are not authorized !");
    }
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        role: user.role,
        status: user.status,
        followerIds: user.followerIds,
        followingIds: user.followingIds
    };
    const accessToken = (0, verifyJWT_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, config_1.default.jwt_access_expires_in);
    return {
        accessToken,
    };
});
const forgetPasswordS = (email) => __awaiter(void 0, void 0, void 0, function* () {
    // checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(email);
    if (!user) {
        throw new Error("User does not exist");
    }
    const isBanned = yield user_model_1.User.isUserBanned(email);
    if (isBanned) {
        const error = new Error("Account is banned");
        error.statusCode = 403; // Set status code for forbidden access
        throw error;
    }
    const jwtPayload = {
        _id: user._id,
        name: user.name,
        email: user.email,
        profilePhoto: user.profilePhoto,
        role: user.role,
        status: user.status,
        followerIds: user.followerIds,
        followingIds: user.followingIds
    };
    const resetToken = (0, verifyJWT_1.createToken)(jwtPayload, config_1.default.jwt_access_secret, '10m');
    const resultUILink = `${config_1.default.client_url}/ResetPasswordPage?email=${email}&token=${resetToken}`;
    const htmlContent = resultUILink;
    const subject = 'Reset your password within 10 minutes';
    const email2 = 'parthapal.ctg@gmail.com';
    emailSender_1.EmailHelper.sendEmail(email, htmlContent, subject);
    console.log(resultUILink);
});
const resetPasswordS = (email, newPassword, token) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(email,newPassword,token);
    // checking if the given token is valid
    const decoded = jsonwebtoken_1.default.verify(token, config_1.default.jwt_access_secret);
    const { email: decodedEmail, iat } = decoded;
    //Checking decoded user email and provided email matched or not
    if (decodedEmail !== email) {
        throw new Error("User does not exist");
    }
    //Checking if the user is exist
    const user = yield user_model_1.User.isUserExistsByEmail(email);
    if (!user) {
        throw new Error("User does not exist");
    }
    const isBanned = yield user_model_1.User.isUserBanned(email);
    if (isBanned) {
        const error = new Error("Account is banned");
        error.statusCode = 403; // Set status code for forbidden access
        throw error;
    }
    //hash new password
    const newHashedPassword = yield bcryptjs_1.default.hash(newPassword, Number(config_1.default.bcrypt_salt_rounds));
    yield user_model_1.User.findOneAndUpdate({
        email: email,
    }, {
        password: newHashedPassword,
        passwordChangedAt: new Date(),
    });
    return null;
});
exports.AuthServices = {
    registerUser,
    loginUser,
    changePasswordS,
    refreshTokenS,
    forgetPasswordS,
    resetPasswordS
};
