"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.postRoutes = void 0;
const express_1 = __importDefault(require("express"));
const postCreation_controller_1 = require("./postCreation.controller");
const sendImageToCloudinary_1 = require("../../utils/sendImageToCloudinary");
const router = express_1.default.Router();
router.post('/create-post', sendImageToCloudinary_1.upload.fields([{ name: 'itemImages' }]), (req, res, next) => {
    req.body = JSON.parse(req.body.data);
    next();
}, postCreation_controller_1.postController.postCreationC);
router.put('/update-post/:id', sendImageToCloudinary_1.upload.fields([{ name: 'itemImages' }]), (req, res, next) => {
    if (req.body.data) {
        try {
            req.body = JSON.parse(req.body.data);
        }
        catch (error) {
            console.error("JSON parsing error:", error);
            return next(new Error("Invalid JSON format in request body"));
        }
    }
    next();
}, postCreation_controller_1.postController.updatePostCreationC);
router.get('/posts', postCreation_controller_1.postController.getPostC);
router.get('/posts/:id', postCreation_controller_1.postController.getPostIDC);
router.patch('/posts/upvote/:id', postCreation_controller_1.postController.updatePostc);
router.patch('/posts/downvote/:id', postCreation_controller_1.postController.updateDownPostc);
router.put('/posts/comments/:id', postCreation_controller_1.postController.addCommentsC);
router.delete('/posts/comments/:id', postCreation_controller_1.postController.deleteCommentsC);
router.patch('/posts/comments/:id', postCreation_controller_1.postController.updateCommentsC);
router.get('/ALLComments', postCreation_controller_1.postController.getCommentC);
router.delete('/posts/:id', postCreation_controller_1.postController.deletePostC);
router.get('/searchPosts', postCreation_controller_1.postController.postSearchItemC);
exports.postRoutes = router;
