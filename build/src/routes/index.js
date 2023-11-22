"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const shortUrlController_1 = require("../controller/shortUrlController");
const validateResource_1 = __importDefault(require("../middleware/validateResource"));
const createShortUrl_1 = __importDefault(require("../schemas/createShortUrl"));
const routes = (app) => {
    app.get("/healthcheck", (req, res) => {
        return res.send("App is looking good");
    });
    app.post("/shorten", (0, validateResource_1.default)(createShortUrl_1.default), shortUrlController_1.createShortUrl);
    app.get("/:identifier", shortUrlController_1.handleRedirect);
};
exports.default = routes;
