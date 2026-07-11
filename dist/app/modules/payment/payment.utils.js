"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sslcz = void 0;
const sslcommerz_lts_1 = __importDefault(require("sslcommerz-lts"));
const store_id = process.env.STORE_ID;
const store_passwd = process.env.STORE_PASSWORD;
const is_live = false;
exports.sslcz = new sslcommerz_lts_1.default(store_id, store_passwd, is_live);
