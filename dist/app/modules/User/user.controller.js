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
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserControllers = void 0;
const user_service_1 = require("./user.service");
const userRegister = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.UserServices.createUser(req.body);
        // send response with created user
        res.status(200).json({
            success: true,
            message: 'User created successfully',
            data: user
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
const userLogin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield user_service_1.UserServices.createUser(req.body);
        // send response with created user
        res.status(200).json({
            success: true,
            message: 'User Login successfully',
            data: user
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'User failed',
            error: error.message
        });
    }
});
const updateUserC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body,req.params.id,req.files);
    try {
        //  Find and update the user
        const updatedUser = yield user_service_1.UserServices.updateUserS(req.body, req.params.id, req.file);
        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
});
const modifyUserC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body,req.params.id,req.files);
    try {
        //  Find and update the user
        const updatedUser = yield user_service_1.UserServices.modifyUserS(req.body, req.params.id);
        res.status(200).json({
            message: "User updated successfully",
        });
    }
    catch (error) {
        res.status(500).json({ message: "Error updating user", error: error.message });
    }
});
const getUserC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(req.user); 
    try {
        const categories = yield user_service_1.UserServices.getUserS();
        res.status(200).json({
            success: true,
            message: 'User found successfully',
            data: categories
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Users not found',
            error: 'An unknown error occurred'
        });
    }
});
const getUserIDC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    //console.log(userId);
    try {
        const posts = yield user_service_1.UserServices.getUserIDS(userId);
        res.status(200).json({
            success: true,
            message: 'user found successfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'user not found',
            error: 'An unknown error occurred'
        });
    }
});
const addFollowerC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const followerId = req.params.id;
    const { currentUser } = req.body;
    const userdata = {
        FollowerId: followerId,
        CurrentUserId: currentUser
    };
    try {
        const followers = yield user_service_1.UserServices.addFollowerS(userdata);
        res.status(200).json({
            success: true,
            message: 'Follower added successfully',
            data: followers
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Follower not added',
            error: 'An unknown error occurred'
        });
    }
});
const addFavouritePostC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.params.id;
    const { postID } = req.body;
    console.log(userId, postID);
    try {
        const followers = yield user_service_1.UserServices.addFavouritePostS(userId, postID);
        res.status(200).json({
            success: true,
            message: 'Follower added successfully',
            data: followers
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Follower not added',
            error: 'An unknown error occurred'
        });
    }
});
const deleteFollowerC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const followingId = req.params.id;
    const { currentUser } = req.body;
    const userdata = {
        FollowingId: followingId,
        CurrentUserId: currentUser
    };
    try {
        const result = yield user_service_1.UserServices.deleteFollowerS(userdata);
        res.status(200).json({
            success: true,
            message: 'Follower Deleted successfully',
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Follower Not Deleted',
            error: 'An unknown error occurred'
        });
    }
});
const updateUserStatusc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // const {status}=req.body;
    console.log(id);
    try {
        const posts = yield user_service_1.UserServices.updateUserStatusS(id, req.body);
        res.status(200).json({
            success: true,
            message: 'user status updated successfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'user status updated failed',
            error: 'An unknown error occurred'
        });
    }
});
exports.UserControllers = {
    userRegister,
    userLogin,
    updateUserC,
    getUserC,
    addFollowerC,
    deleteFollowerC,
    updateUserStatusc,
    addFavouritePostC,
    getUserIDC,
    modifyUserC
};
