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
exports.UserServices = void 0;
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const user_model_1 = require("./user.model");
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const user = user_model_1.User.create(payload);
    return user;
});
const updateUserS = (payload, id, imageData) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(payload.profilePhoto, 'payload profile');
    let profilePhoto = payload.profilePhoto || '';
    // console.log(payload,id,imageData);
    const imageName = `${Array.from({ length: 10 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]).join('')}`;
    const path = imageData === null || imageData === void 0 ? void 0 : imageData.path;
    const result = yield (0, sendImageToCloudinary_1.sendImageToCloudanary)(imageName, path);
    if (result) {
        const { secure_url } = result; // Extract secure_url from the response
        // console.log(secure_url, 'ssecureurl');
        profilePhoto = secure_url; // Add the secure_url to the images array
        // console.log(payload);
    }
    else {
        console.log("Image upload failed, no result returned.");
    }
    // Find and update the user
    const { name, email } = payload;
    const updatedUserDetails = yield user_model_1.User.findByIdAndUpdate(id, { name, email, profilePhoto }, { new: true, runValidators: true } // Return updated document, validate inputs
    );
    return null;
});
const modifyUserS = (payload, id) => __awaiter(void 0, void 0, void 0, function* () {
    // Find and update the user
    //console.log(payload,id);     
    const updatedUserDetails = yield user_model_1.User.findByIdAndUpdate(id, payload, { new: true, runValidators: true } // Return updated document, validate inputs
    );
    return null;
});
const getUserS = () => {
    const result = user_model_1.User.find({ role: { $ne: "ADMIN" } }).populate([
        {
            path: 'followingIds',
            select: '_id name profilePhoto', // Fetch specific fields
        },
        {
            path: 'followerIds',
            select: '_id name profilePhoto', // Fetch specific fields
        },
    ]);
    return result;
};
const getUserIDS = (id) => {
    const result = user_model_1.User.findById(id).populate([
        {
            path: 'followingIds',
            select: '_id name profilePhoto', // Fetch specific fields
        },
        {
            path: 'followerIds',
            select: '_id name profilePhoto', // Fetch specific fields
        },
    ]);
    return result;
};
const addFollowerS = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(payload.FollowerId,payload.CurrentUserId);      
    // const userDetails=await User.findById(payload.CurrentUserId);
    yield user_model_1.User.findByIdAndUpdate(payload.CurrentUserId, { $addToSet: { followingIds: payload.FollowerId } }, { new: true });
    yield user_model_1.User.findByIdAndUpdate(payload.FollowerId, { $addToSet: { followerIds: payload.CurrentUserId } }, { new: true });
    //   const userDetails=await User.findById(payload.CurrentUserId);
});
const addFavouritePostS = (userId, postID) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(payload.FollowerId,payload.CurrentUserId);      
    // const userDetails=await User.findById(payload.CurrentUserId);
    yield user_model_1.User.findByIdAndUpdate(userId, { $addToSet: { favoritePosts: postID } }, { new: true });
    //   const userDetails=await User.findById(payload.CurrentUserId);
});
const deleteFollowerS = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    // console.log(payload.FollowerId,payload.CurrentUserId);      
    // const userDetails=await User.findById(payload.CurrentUserId);
    yield user_model_1.User.findByIdAndUpdate(payload.CurrentUserId, { $pull: { followingIds: payload.FollowingId } }, { new: true });
    yield user_model_1.User.findByIdAndUpdate(payload.FollowingId, { $pull: { followerIds: payload.CurrentUserId } }, { new: true });
    return null;
    //   const userDetails=await User.findById(payload.CurrentUserId);
});
const updateUserStatusS = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = user_model_1.User.findByIdAndUpdate({ _id: id }, { status: 'PREMIUM' }, { new: true });
    return result;
});
exports.UserServices = {
    createUser,
    updateUserS,
    getUserS,
    addFollowerS,
    deleteFollowerS,
    updateUserStatusS,
    addFavouritePostS,
    getUserIDS,
    modifyUserS
};
