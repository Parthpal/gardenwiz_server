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
exports.postController = void 0;
const postCreation_service_1 = require("./postCreation.service");
const postCreationC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const post = yield postCreation_service_1.postServices.createPosts(req.body, req.files);
        // send response with created user
        // console.log(post);
        res.status(200).json({
            success: true,
            message: 'Data Posted successfully',
            data: post
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Data Posted failed',
            error: error.message
        });
    }
});
const updatePostCreationC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    //console.log(req.body,req.files);
    try {
        const paramId = req.params.id;
        const post = yield postCreation_service_1.postServices.updatePostCreationS(req.body, req.files, paramId);
        // send response with created user
        // console.log(post);
        res.status(200).json({
            success: true,
            message: 'Data update successfully',
            data: post
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Data Updation failed',
            error: error.message
        });
    }
});
const getPostC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postCreation_service_1.postServices.getPostS();
        res.status(200).json({
            success: true,
            message: 'post found successfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'post not found',
            error: 'An unknown error occurred'
        });
    }
});
const postSearchItemC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = req.query;
    try {
        if (!searchTerm) {
            return res.status(400).json({
                success: false,
                message: "Search term is required",
            });
        }
        const results = yield postCreation_service_1.postServices.postSearchItemS(searchTerm);
        res.status(200).json({
            success: true,
            message: "Search results retrieved successfully",
            data: results,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to search items",
            error: "An unknown error occurred",
        });
    }
});
const getPostIDC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const postId = req.params.id;
    try {
        const posts = yield postCreation_service_1.postServices.getPostIDS(postId);
        res.status(200).json({
            success: true,
            message: 'post found successfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'post not found',
            error: 'An unknown error occurred'
        });
    }
});
const updatePostc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    console.log(id);
    try {
        const posts = yield postCreation_service_1.postServices.updateUpvotePostS(id);
        res.status(200).json({
            success: true,
            message: 'post found successfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'post not found',
            error: 'An unknown error occurred'
        });
    }
});
const updateDownPostc = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    // console.log(id);
    try {
        const posts = yield postCreation_service_1.postServices.updateDownvotePostS(id);
        res.status(200).json({
            success: true,
            message: 'Downvote Updated succcessfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'post not found',
            error: 'An unknown error occurred'
        });
    }
});
const getCommentC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const posts = yield postCreation_service_1.postServices.getCommentS();
        res.status(200).json({
            success: true,
            message: 'comments found successfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'comments not found',
            error: 'An unknown error occurred'
        });
    }
});
const addCommentsC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const reqBody = req.body;
    //console.log(id,reqBody);
    try {
        const posts = yield postCreation_service_1.postServices.addCommentS(id, reqBody);
        res.status(200).json({
            success: true,
            message: 'Comment Added succcessfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Comments Not Added',
            error: 'An unknown error occurred'
        });
    }
});
const deleteCommentsC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const postID = req.body.postData;
    try {
        const posts = yield postCreation_service_1.postServices.deleteCommentS(id, postID);
        res.status(200).json({
            success: true,
            message: 'Comment deleted succcessfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Comments not deleted',
            error: 'An unknown error occurred'
        });
    }
});
const deletePostC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    try {
        const posts = yield postCreation_service_1.postServices.deletePostS(id);
        res.status(200).json({
            success: true,
            message: 'Post deleted succcessfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Posts not deleted',
            error: 'An unknown error occurred'
        });
    }
});
const updateCommentsC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.params.id;
    const reqBody = req.body;
    //console.log(id,reqBody);
    try {
        const posts = yield postCreation_service_1.postServices.updateCommentS(id, reqBody);
        res.status(200).json({
            success: true,
            message: 'Comment Added succcessfully',
            data: posts
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'Comments Not Added',
            error: 'An unknown error occurred'
        });
    }
});
exports.postController = {
    postCreationC,
    getPostC,
    updatePostc,
    updateDownPostc,
    addCommentsC,
    getPostIDC,
    deleteCommentsC,
    updateCommentsC,
    getCommentC,
    deletePostC,
    updatePostCreationC,
    postSearchItemC
};
