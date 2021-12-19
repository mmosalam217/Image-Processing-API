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
const fs_1 = __importDefault(require("fs"));
describe('Test serving resized and full images', () => {
    let service;
    beforeAll(() => {
        service = new ImageService_1.default();
    });
    it('Should return correct filepath for full image size', () => __awaiter(void 0, void 0, void 0, function* () {
        const expected = '/home/workspace/images/full/fjord.jpg';
        const queryParams = {};
        const w = queryParams.width;
        const h = queryParams.height;
        const imgPath = yield service.display('fjord', parseInt(w), parseInt(h));
        expect(imgPath).toEqual(expected);
    }));
    it('Should return filepath for a new resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        const expected = '/home/workspace/images/resized/fjord_700_350.jpg';
        expect(fs_1.default.existsSync(expected)).toBeFalsy();
        const queryParams = { width: '700', height: '350' };
        const w = queryParams.width;
        const h = queryParams.height;
        const imgPath = yield service.display('fjord', parseInt(w), parseInt(h));
        expect(imgPath).toEqual(expected);
        fs_1.default.unlinkSync(expected);
    }));
    it('Should return filepath for a cached resized image', () => __awaiter(void 0, void 0, void 0, function* () {
        const expected = '/home/workspace/images/resized/fjord_500_300.jpg';
        expect(fs_1.default.existsSync(expected)).toBe(true);
        const queryParams = { width: '500', height: '300' };
        const w = queryParams.width;
        const h = queryParams.height;
        const imgPath = yield service.display('fjord', parseInt(w), parseInt(h));
        expect(imgPath).toEqual(expected);
    }));
    it('Should throw No Such File Exists exception', () => __awaiter(void 0, void 0, void 0, function* () {
        const queryParams = {};
        const w = queryParams.width;
        const h = queryParams.height;
        yield expectAsync(service.display('wrong', parseInt(w), parseInt(h)))
            .toBeRejectedWith(new Error('No Such File Exists'));
    }));
});
