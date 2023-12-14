"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    profile: joi_1.default.object().keys({
        name: joi_1.default.string().trim().length(5).required(),
    }),
};
//# sourceMappingURL=schema.js.map