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
exports.postServices = exports.postSearchItemS = void 0;
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const postCreation_model_1 = __importDefault(require("./postCreation.model"));
const meilisearch_1 = require("../../utils/meilisearch");
const createPosts = (payload, imageData) => __awaiter(void 0, void 0, void 0, function* () {
    let itemImages = [];
    yield Promise.all(imageData === null || imageData === void 0 ? void 0 : imageData.itemImages.map((data) => __awaiter(void 0, void 0, void 0, function* () {
        //it creates a random name of image
        const imageName = `${Array.from({ length: 10 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]).join('')}`;
        const path = data === null || data === void 0 ? void 0 : data.path;
        const result = yield (0, sendImageToCloudinary_1.sendImageToCloudanary)(imageName, path);
        if (result) {
            const { secure_url } = result; // Extract secure_url from the response
            // console.log(secure_url, 'ssecureurl');
            itemImages === null || itemImages === void 0 ? void 0 : itemImages.push(secure_url); // Add the secure_url to the images array
            // console.log(payload);
        }
        else {
            console.log("Image upload failed, no result returned.");
        }
    })));
    payload.images = itemImages;
    //payload.premium= false;
    payload.upvotes = 0;
    payload.downvotes = 0;
    payload.createdAt = new Date();
    payload.updatedAt = new Date();
    //console.log(payload);
    const result = yield postCreation_model_1.default.create(payload);
    //const {_id,title,content,tags}=result
    //console.log(result);
    yield (0, meilisearch_1.addDocumentToIndex)(result, 'itemPost');
    //console.log(result);
    //await meiliClient.index('itemPost').addDocuments([{_id:_id.toString(),title,content,tags}]);
    return result;
});
const updatePostCreationS = (payload, imageData, paramId) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    let itemImages = [];
    // Process new images if they exist
    if ((_a = imageData === null || imageData === void 0 ? void 0 : imageData.itemImages) === null || _a === void 0 ? void 0 : _a.length) {
        yield Promise.all(imageData.itemImages.map((data) => __awaiter(void 0, void 0, void 0, function* () {
            const imageName = `${Array.from({ length: 10 }, () => "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"[Math.floor(Math.random() * 62)]).join('')}`;
            const path = data === null || data === void 0 ? void 0 : data.path;
            const result = yield (0, sendImageToCloudinary_1.sendImageToCloudanary)(imageName, path);
            if (result) {
                const { secure_url } = result;
                itemImages.push(secure_url);
            }
            else {
                console.log("Image upload failed, no result returned.");
            }
        })));
    }
    // Ensure data updates even if no new images are uploaded
    const updateData = {
        content: payload.content,
        title: payload.title,
        categoryID: payload.categoryID,
        tags: payload.tags,
    };
    //  Only update images if new ones are uploaded
    if (itemImages.length > 0 || payload.images.length > 0) {
        updateData.images = [...payload.images, ...itemImages];
    }
    const result = yield postCreation_model_1.default.findByIdAndUpdate({ _id: paramId }, { $set: updateData }, { new: true });
    return result;
});
const postSearchItemS = (searchTerm) => __awaiter(void 0, void 0, void 0, function* () {
    const searchRegex = new RegExp(searchTerm, "i"); // Case-insensitive search
    return yield postCreation_model_1.default.find({
        $or: [
            { title: searchRegex },
            { content: searchRegex },
            { tags: searchRegex },
        ],
    });
});
exports.postSearchItemS = postSearchItemS;
const getPostS = () => {
    const result = postCreation_model_1.default.find().sort({ createdAt: -1 }).populate({
        path: 'userID',
        select: 'name email profilePhoto'
    });
    return result;
};
const getPostIDS = (id) => {
    const result = postCreation_model_1.default.findById(id).populate({
        path: 'comments.userID',
        select: 'name profilePhoto', // Fetch specific fields
    })
        .exec();
    return result;
};
const updateUpvotePostS = (id) => {
    const result = postCreation_model_1.default.findByIdAndUpdate({ _id: id }, { $inc: { upvotes: 1 } }, { new: true });
    return result;
};
const updateDownvotePostS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = postCreation_model_1.default.findByIdAndUpdate({ _id: id }, { $inc: { downvotes: 1 } }, { new: true });
    return result;
});
const getCommentS = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield postCreation_model_1.default.aggregate([
        { $project: { comments: 1, _id: 0 } },
        { $unwind: "$comments" }
    ]);
    return result;
});
const addCommentS = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(id, payload);
    const result = postCreation_model_1.default.findByIdAndUpdate({ _id: id }, {
        $push: {
            comments: {
                userID: payload.userID, comment: payload.comments
            }
        }
    }, { new: true });
    return result;
});
const updateCommentS = (id, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const result = postCreation_model_1.default.updateOne({ _id: payload.postId, 'comments._id': id }, {
        $set: {
            'comments.$.comment': payload.comments
        }
    }, { new: true });
    return result;
});
const deleteCommentS = (id, postId) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(id,postId); 
    const result = postCreation_model_1.default.findByIdAndUpdate({ _id: postId }, {
        $pull: {
            comments: {
                _id: id
            }
        }
    }, { new: true });
    return result;
});
const deletePostS = (id) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(id,postId); 
    const result = yield postCreation_model_1.default.findByIdAndDelete({ _id: id }, { new: true });
    const deleteItemId = result === null || result === void 0 ? void 0 : result._id;
    if (deleteItemId) {
        yield (0, meilisearch_1.deleteDocumentFromIndex)('itemPost', deleteItemId.toString());
    }
    return result;
});
exports.postServices = {
    createPosts,
    getPostS,
    getPostIDS,
    updateUpvotePostS, updateDownvotePostS,
    addCommentS,
    deleteCommentS,
    updateCommentS,
    getCommentS,
    deletePostS,
    updatePostCreationS,
    postSearchItemS: exports.postSearchItemS
};
