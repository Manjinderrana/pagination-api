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
exports.chunks = void 0;
const fs_1 = __importDefault(require("fs"));
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
const perPage = 150;
let data;
const delay = () => new Promise(resolve => setTimeout(resolve, 4000));
fs_1.default.readFile('data.json', 'utf8', (err, jsonString) => {
    if (err) {
        console.error('Error reading JSON file:', err);
        return;
    }
    try {
        data = ((JSON.parse(jsonString)));
    }
    catch (err) {
        console.error('Error parsing JSON file:', err);
    }
});
const chunks = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let index = 0;
        while (index < data.length) {
            const chunked = data.slice(index, index + perPage);
            try {
                yield prisma.product.createMany({
                    data: chunked.map((item) => ({
                        name: item === null || item === void 0 ? void 0 : item.name,
                        sku: item === null || item === void 0 ? void 0 : item.sku,
                        product_type: item === null || item === void 0 ? void 0 : item.product_type,
                        categories: item === null || item === void 0 ? void 0 : item.categories,
                        attribute_set_code: item === null || item === void 0 ? void 0 : item.attribute_set_code,
                        product_websites: item === null || item === void 0 ? void 0 : item.product_websites,
                    })),
                });
                console.log(`Inserted chunk starting from index ${index}`);
            }
            catch (err) {
                console.error(`Error inserting chunk starting from index ${index}:`, err);
            }
            index += perPage;
            yield delay();
        }
        res.json({ message: 'data inserted in chunks successfully' });
    }
    catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    finally {
        yield prisma.$disconnect();
    }
});
exports.chunks = chunks;
