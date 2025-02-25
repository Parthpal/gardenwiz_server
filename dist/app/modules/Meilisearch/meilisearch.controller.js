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
exports.MeilisearchController = void 0;
const meilisearch_services_1 = require("./meilisearch.services");
const getMeiliSearchPostC = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, limit } = req.query;
    // console.log(searchTerm);
    //console.log(req.data);
    const numberLimit = Number(limit) || 10;
    try {
        const result = yield meilisearch_services_1.MeilisearchServices.getAllPosts(numberLimit, searchTerm);
        res.status(200).json({
            success: true,
            message: 'meilisearch post found successfully',
            data: result
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: 'meilisearch post not found',
            error: 'An unknown error occurred'
        });
    }
});
exports.MeilisearchController = {
    getMeiliSearchPostC
};
