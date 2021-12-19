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
const ImageService_1 = __importDefault(require("../service/ImageService"));
const imageService = new ImageService_1.default();
const serveImage = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        // Extract dimensions from query if exist
        const w = req.query.width;
        const h = req.query.height;
        // Neglect if just one size property is defined..
        if ((w && !h) || (!w && h)) {
            return res.status(403).json({ error: 'Please provide a comination of width and height' });
        }
        const img_url = yield imageService.display(req.params.image, parseInt(w), parseInt(h));
        return res.sendFile(img_url);
    }
    catch (err) {
        console.log(err);
        return res.json({ error: err });
    }
});
const image_resizing_route = (app) => __awaiter(void 0, void 0, void 0, function* () {
    app.get('/api/images/:image', serveImage);
});
exports.default = image_resizing_route;
