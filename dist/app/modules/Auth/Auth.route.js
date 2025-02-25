"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authRoutes = void 0;
const express_1 = __importDefault(require("express"));
const Auth_controller_1 = require("./Auth.controller");
const validateRequest_1 = require("../../middlewares/validateRequest");
const Auth_validation_1 = require("./Auth.validation");
const Auth_1 = require("../../middlewares/Auth");
const user_constant_1 = require("../User/user.constant");
const router = express_1.default.Router();
router.post('/register', Auth_controller_1.AuthControllers.registerUser);
router.post('/login', (0, validateRequest_1.validateRequest)(Auth_validation_1.AuthValidation.loginValidationSchema), Auth_controller_1.AuthControllers.loginUser);
router.post('/change-password', (0, Auth_1.auth)(user_constant_1.USER_ROLE.USER), (0, validateRequest_1.validateRequest)(Auth_validation_1.AuthValidation.passwordValidationSchema), Auth_controller_1.AuthControllers.changePasswordC);
router.post('/refresh-token', (0, validateRequest_1.validateRequestCookies)(Auth_validation_1.AuthValidation.refreshTokenValidationSchema), Auth_controller_1.AuthControllers.refreshTokenC);
router.post('/forget-password', 
// validateRequest(AuthValidation.forgetPasswordValidationSchema),
Auth_controller_1.AuthControllers.forgetPasswordC);
router.post('/reset-password', 
// validateRequest(AuthValidation.resetPasswordValidationSchema),
Auth_controller_1.AuthControllers.resetPasswordC);
exports.authRoutes = router;
