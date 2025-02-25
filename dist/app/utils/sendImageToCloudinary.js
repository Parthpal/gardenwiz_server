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
exports.upload = exports.sendImageToCloudanary = void 0;
const cloudinary_1 = require("cloudinary");
const config_1 = __importDefault(require("../config"));
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const sendImageToCloudanary = (imageName, path) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Configuration
        cloudinary_1.v2.config({
            cloud_name: config_1.default.cloudinary_cloud_name,
            api_key: config_1.default.cloudinary_api_key,
            api_secret: config_1.default.cloudinary_api_secret,
        });
        // Upload an image
        const uploadResult = yield cloudinary_1.v2.uploader.upload(path, {
            public_id: imageName,
        });
        // console.log("Upload Result:", uploadResult); // Optional: Log for debugging
        fs_1.default.unlink(path, (err) => {
            if (err) {
                console.error(err);
            }
            else {
                console.error('File is deleted');
            }
        });
        return uploadResult; // Return the result
    }
    catch (error) {
        console.error("Error uploading to Cloudinary:", error);
        return null; // Return null in case of an error
    }
});
exports.sendImageToCloudanary = sendImageToCloudanary;
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, process.cwd() + '/src/uploads/');
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        cb(null, file.fieldname + '-' + uniqueSuffix);
    }
});
exports.upload = (0, multer_1.default)({ storage: storage });
