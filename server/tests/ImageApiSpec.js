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
const supertest_1 = __importDefault(require("supertest"));
const index_1 = __importDefault(require("../index"));
describe('Should return correct responses for images handler', () => __awaiter(void 0, void 0, void 0, function* () {
    it('GET:/api/images/:image Should return 200 OK', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = yield (0, supertest_1.default)(index_1.default).get('/api/images/fjord').send();
        expect(req.status).toBe(200);
    }));
    it('GET:/api/images/:image Should return 404 BAD REQUEST as there is no file with that name', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = yield (0, supertest_1.default)(index_1.default).get('/api/images/xx').send();
        expect(req.status).toBe(404);
    }));
    it('GET:/api/images/:image Should return 400 BAD REQUEST if width or height < 1', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = yield (0, supertest_1.default)(index_1.default).get('/api/images/fjord?width=0&height=100').send();
        expect(req.status).toBe(400);
    }));
    it('GET:/api/images/:image Should return 400 BAD REQUEST if only width or height is given', () => __awaiter(void 0, void 0, void 0, function* () {
        const req = yield (0, supertest_1.default)(index_1.default).get('/api/images/fjord?height=100').send();
        expect(req.status).toBe(400);
    }));
}));
