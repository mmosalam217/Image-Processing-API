"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const images_1 = __importDefault(require("./api/images"));
const app = (0, express_1.default)();
const port = 3000;
// append route to the app..
(0, images_1.default)(app);
app.use(body_parser_1.default.json());
app.get('/', (req, res) => {
    res.send('Connected');
});
app.listen(port, () => {
    console.log(`Started server on port ${port}`);
});
