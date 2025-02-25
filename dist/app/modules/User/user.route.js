"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRoutes = void 0;
const express_1 = __importDefault(require("express"));
const user_controller_1 = require("./user.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const Auth_1 = require("../../middlewares/Auth");
const user_constant_1 = require("./user.constant");
const router = express_1.default.Router();
router.post('/create-user', user_controller_1.UserControllers.userRegister);
router.put('/user/:id', sendImageToCloudinary_1.upload.single('profilePhoto'), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, user_controller_1.UserControllers.updateUserC);
router.get('/user', (0, Auth_1.auth)(user_constant_1.USER_ROLE.USER), user_controller_1.UserControllers.getUserC);
router.get('/user/:id', user_controller_1.UserControllers.getUserIDC);
router.put('/user/update/:id', user_controller_1.UserControllers.modifyUserC);
router.put('/user/:id/follow', user_controller_1.UserControllers.addFollowerC);
router.put('/user/:id/unfollow', user_controller_1.UserControllers.deleteFollowerC);
router.put('/user/:id/favouritePost', user_controller_1.UserControllers.addFavouritePostC);
router.patch('/user/status/:id', user_controller_1.UserControllers.updateUserStatusc);
exports.UserRoutes = router;
