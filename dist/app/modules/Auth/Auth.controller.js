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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthControllers = void 0;
const Auth_service_1 = require("./Auth.service");
const config_1 = __importDefault(require("../../config"));
const registerUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Auth_service_1.AuthServices.registerUser(req.body);
        const { refreshToken, accessToken } = result;
        res.cookie('refreshToken', refreshToken, {
            secure: config_1.default.NODE_ENV === 'development',
            httpOnly: true,
            sameSite: true,
        });
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: {
                refreshToken,
                accessToken
            }
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User creation failed',
            error: error.message
        });
    }
});
const loginUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield Auth_service_1.AuthServices.loginUser(req.body);
        //console.log(result);
        const { refreshToken, accessToken } = result;
        console.log(accessToken);
        res.cookie('refreshToken', refreshToken, {
            secure: config_1.default.NODE_ENV === 'development',
            httpOnly: true,
        });
        res.status(200).json({
            success: true,
            message: 'User Login successfully',
            data: {
                refreshToken,
                accessToken
            }
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: error.statusCode === 403 ? "Account is banned" : "User Login Failed",
            error: error.message
        });
    }
});
const changePasswordC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const passwordData = __rest(req.body, []);
        // console.log(req.user,passwordData); 
        const result = yield Auth_service_1.AuthServices.changePasswordS(req.user, passwordData);
        //console.log(result);
        res.status(200).json({
            success: true,
            message: 'Password changed successfully',
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Password not changed',
            error: error.message
        });
    }
});
const refreshTokenC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { refreshToken } = req.cookies;
        const result = yield Auth_service_1.AuthServices.refreshTokenS(refreshToken);
        console.log(result);
        res.status(200).json({
            success: true,
            message: 'Access token retrieved successfully!',
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Access token retrieved failed!',
            error: error.message
        });
    }
});
const forgetPasswordC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.body;
        //console.log(email);
        const result = yield Auth_service_1.AuthServices.forgetPasswordS(email);
        // console.log(result);
        res.status(200).json({
            success: true,
            message: 'Access token retrieved successfully!',
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Access token retrieved failed!',
            error: error.message
        });
    }
});
const resetPasswordC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, newPassword } = req.body;
        const token = req.headers.authorization;
        console.log(email, newPassword, token);
        const result = yield Auth_service_1.AuthServices.resetPasswordS(email, newPassword, token);
        // console.log(result);
        res.status(200).json({
            success: true,
            message: 'Password Reset successfully!',
        });
    }
    catch (error) {
        res.status(error.statusCode || 500).json({
            success: false,
            message: 'Password Reset Failed',
            error: error.message
        });
    }
});
exports.AuthControllers = {
    registerUser,
    loginUser,
    changePasswordC,
    refreshTokenC,
    forgetPasswordC,
    resetPasswordC
};
