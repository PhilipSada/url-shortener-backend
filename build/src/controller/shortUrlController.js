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
exports.handleRedirect = exports.createShortUrl = void 0;
const shortUrl_1 = __importDefault(require("../models/shortUrl"));
const nanoid_1 = require("nanoid");
function createShortUrl(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        // Get the destination from the request body
        const { destination, preferredAlias } = req.body;
        try {
            // Check if the preferred alias is already taken
            if (preferredAlias) {
                const existingUrl = yield shortUrl_1.default.findOne({ preferredAlias });
                if (existingUrl) {
                    return res
                        .status(400)
                        .json({ message: "Preferred alias is already taken." });
                }
            }
            // Generate shortId using nanoid
            const nanoid = (0, nanoid_1.customAlphabet)("abcdefghijklmnopqrstuv0987654321", 6);
            const shortId = nanoid();
            // Store the URL mapping
            const urlDocument = new shortUrl_1.default({
                destination,
                preferredAlias,
                shortId,
            });
            yield urlDocument.save();
            const shortUrl = `http://localhost:4000/${urlDocument.shortId}`;
            res.json({
                shortUrl,
                alias: urlDocument.preferredAlias,
                id: urlDocument.shortId,
            });
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ message: "Internal server error." });
        }
    });
}
exports.createShortUrl = createShortUrl;
function handleRedirect(req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const { identifier } = req.params;
        try {
            // Find the URL document by either shortId or preferredAlias
            const urlDocument = yield shortUrl_1.default.findOne({
                $or: [{ shortId: identifier }, { preferredAlias: identifier }],
            });
            if (!urlDocument) {
                return res.status(404).json({ error: "Shortened URL not found." });
            }
            res.redirect(urlDocument.destination);
        }
        catch (error) {
            console.error(error);
            res.status(500).json({ error: "Internal server error." });
        }
    });
}
exports.handleRedirect = handleRedirect;
