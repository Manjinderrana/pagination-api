"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
const routes_1 = require("../src/routes");
app.use(express_1.default.json());
app.use('/api/v1/', routes_1.router);
app.get('/', (_req, res) => {
    res.json({ message: 'Backend Working' });
});
app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
