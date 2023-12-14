"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const schema_1 = __importDefault(require("./schema"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const crypto_1 = __importDefault(require("crypto"));
const utils_1 = require("./utils");
const ApiResponse_1 = require("../../../core/ApiResponse");
const validator_1 = __importDefault(require("../../../helpers/validator"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const UserRepo_1 = __importDefault(require("../../../database/repository/UserRepo"));
const KeystoreRepo_1 = __importDefault(require("../../../database/repository/KeystoreRepo"));
const authUtils_1 = require("../../../auth/authUtils");
const router = express_1.default.Router();
router.post("/basic", (0, validator_1.default)(schema_1.default.credential), (0, asyncHandler_1.default)(async (req, res) => {
    const { account_name, password } = req.body;
    const user = await UserRepo_1.default.findByAccountName(account_name);
    if (!user)
        throw new ApiResponse_1.BadRequestResponse("User not registered").send(res);
    if (!user.password)
        throw new ApiResponse_1.BadRequestResponse("Credential not set").send(res);
    const match = await bcrypt_1.default.compare(password, user.password);
    if (!match)
        throw new ApiResponse_1.AuthFailureResponse("Authentication failure").send(res);
    const accessTokenKey = crypto_1.default.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString("hex");
    await KeystoreRepo_1.default.create(user, accessTokenKey, refreshTokenKey);
    const tokens = await (0, authUtils_1.createTokens)(user, accessTokenKey, refreshTokenKey);
    const userData = await (0, utils_1.getUserData)(user);
    new ApiResponse_1.SuccessResponse("Login Success", {
        user: userData,
        tokens: tokens,
    }).send(res);
}));
exports.default = router;
//# sourceMappingURL=login.js.map