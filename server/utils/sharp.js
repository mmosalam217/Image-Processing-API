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
exports.resize = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const promises_1 = __importDefault(require("fs/promises"));
function resize(filename, width, height) {
    return __awaiter(this, void 0, void 0, function* () {
        // Define input and output directories..
        const filepath = path_1.default.join(__dirname, '../../images/full', filename + '.jpg');
        let outputDir = path_1.default.join(__dirname, '../../images/resized/');
        try {
            // Return a buffer to access width and height customized by sharp in case one of the 2 props is not proivded..
            // This helps when storing the image with its name and size into the filesystem for later cashing...
            const { info, data } = yield (0, sharp_1.default)(filepath).resize({ width, height }).toBuffer({ resolveWithObject: true });
            const resized_filename = outputDir + filename + '_' + info.width + '_' + info.height + '.jpg';
            // Write new file for resized image from the buffer provided by sharp..
            const resized_image = yield promises_1.default.writeFile(resized_filename, Buffer.from(data.buffer));
            return resized_filename;
        }
        catch (err) {
            throw new Error(`Resizing image failed with error ${err}`);
        }
    });
}
exports.resize = resize;
