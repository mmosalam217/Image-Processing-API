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
const sharp_1 = require("../utils/sharp");
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
class ImageService {
    constructor() {
        this.full_image_path = path_1.default.resolve('images/full');
        this.resized_image_path = path_1.default.resolve('images/resized');
    }
    display(image_name, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                // Check if requested image exists
                if (fs_1.default.existsSync(path_1.default.join(this.full_image_path, image_name + '.jpg'))) {
                    // if there are no dimensions specified return the original
                    if (!width && !height)
                        return path_1.default.join(this.full_image_path, image_name + '.jpg');
                    // check if there is already a resized image of that size and return it
                    const cached = yield this.isCached(image_name, width, height);
                    if (cached) {
                        return path_1.default.join(this.resized_image_path, image_name + '_' + width + '_' + height + '.jpg');
                    }
                    else {
                        return (0, sharp_1.resize)(image_name, width, height);
                    }
                }
                else {
                    throw new Error('No Such File Exists');
                }
            }
            catch (err) {
                throw new Error(`${err.message}`);
            }
        });
    }
    isCached(name, width, height) {
        return __awaiter(this, void 0, void 0, function* () {
            return fs_1.default.existsSync(path_1.default.join(this.resized_image_path, name + '_' + width + '_' + height + '.jpg'));
        });
    }
}
exports.default = ImageService;
