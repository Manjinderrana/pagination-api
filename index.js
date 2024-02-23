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
const express_1 = __importDefault(require("express"));
const fs_1 = __importDefault(require("fs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const app = (0, express_1.default)();
let currentPage = 1;
const perPage = 150;
let data = [];
fs_1.default.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }
    try {
        data = JSON.parse(jsonString);
    }
    catch (err) {
        console.error('Error parsing JSON file:', err);
    }
});
app.get('/data', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startIdx = (currentPage - 1) * perPage;
        const endIdx = startIdx + perPage;
        const chunk = data.slice(startIdx, endIdx);
        yield prisma.product.createMany({
            data: chunk.map(item => ({
                sku: item.sku,
                id: item.id,
                product_type: item.product_type,
                attribute_set_code: item.attribute_set_code,
                product_websites: item.product_websites,
                categories: item.categories,
                name: item.name
            })),
        });
        currentPage++;
        res.json({ data: chunk, currentPage, perPage, });
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
}));
app.listen(3000, () => {
    console.log('Server is running on port http://localhost:3000');
});
