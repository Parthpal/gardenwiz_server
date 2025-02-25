"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryServices = void 0;
const category_model_1 = require("./category.model");
const getCategoryS = () => {
    const result = category_model_1.Category.find();
    return result;
};
exports.CategoryServices = {
    getCategoryS,
};
