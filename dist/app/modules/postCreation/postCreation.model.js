"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importStar(require("mongoose"));
const postCreation_constant_1 = require("./postCreation.constant");
const postSchema = new mongoose_1.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    userID: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
    categoryID: { type: mongoose_1.default.Types.ObjectId, ref: 'Category', required: true },
    images: { type: [String], default: [] },
    comments: [{
            userID: { type: mongoose_1.default.Types.ObjectId, ref: 'User', required: true },
            comment: { type: String, required: true }, // The comment text
            createdAt: { type: Date, default: Date.now } // Timestamp for the comment
        }],
    // premium: { type: Boolean, required: true },
    upvotes: { type: Number, default: 0 },
    downvotes: { type: Number, default: 0 },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    tags: {
        type: String,
        enum: Object.keys(postCreation_constant_1.tags),
        default: postCreation_constant_1.tags.Beginners
    }
});
const Post = mongoose_1.default.model('Post', postSchema);
exports.default = Post;
