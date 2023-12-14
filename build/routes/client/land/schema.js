"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const joi_1 = __importDefault(require("joi"));
exports.default = {
    buyLand: joi_1.default.object().keys({
        land_id: joi_1.default.number().required(),
    }),
};
//# sourceMappingURL=schema.js.map