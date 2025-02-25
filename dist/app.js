"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const express_1 = __importDefault(require("express"));
const config_1 = __importDefault(require("./app/config"));
const cors_1 = __importDefault(require("cors"));
const http_status_1 = __importDefault(require("http-status"));
const user_route_1 = require("./app/modules/User/user.route");
const Auth_route_1 = require("./app/modules/Auth/Auth.route");
const category_route_1 = require("./app/modules/categories/category.route");
const postCreation_route_1 = require("./app/modules/postCreation/postCreation.route");
const payment_route_1 = require("./app/modules/payment/payment.route");
const meilisearch_routes_1 = require("./app/modules/Meilisearch/meilisearch.routes");
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: [config_1.default.client_url],
}));
app.use((0, cookie_parser_1.default)());
//parser
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use('/api/v1', user_route_1.UserRoutes);
app.use('/api/v1/auth', Auth_route_1.authRoutes);
app.use('/api/v1/', category_route_1.categoryRoutes);
app.use('/api/v1/', postCreation_route_1.postRoutes);
app.use('/api/v1/', payment_route_1.paymentRoutes);
app.use('/api/v1/', meilisearch_routes_1.MeilisearchRoutes);
//Testing
app.get('/', (req, res, next) => {
    res.status(http_status_1.default.OK).json({
        success: true,
        message: 'Welcome to the GardenWiz API',
    });
});
//global error handler
//app.use(globalErrorHandler);
//handle not found
//app.use(notFound);
exports.default = app;
