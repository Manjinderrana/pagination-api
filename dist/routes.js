"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const controller_1 = require("./controller");
exports.router = (0, express_1.Router)();
exports.router.post('/chunk', controller_1.chunks);
