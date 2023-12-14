"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const crypto_1 = __importDefault(require("crypto"));
const UserRepo_1 = __importDefault(require("../../../database/repository/UserRepo"));
const User_1 = require("../../../database/model/User");
const authUtils_1 = require("../../../auth/authUtils");
const validator_1 = __importDefault(require("../../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const Role_1 = require("../../../database/model/Role");
const utils_1 = require("./utils");
const utils_2 = require("../../../utils");
const router = express_1.default.Router();
router.post("/basic", (0, validator_1.default)(schema_1.default.signup), (0, asyncHandler_1.default)(async (req, res) => {
    const user = await UserRepo_1.default.findByAccountName(req.body.account_name);
    if (user)
        throw new ApiResponse_1.BadRequestResponse("User already registered").send(res);
    const highestUser = await User_1.UserModel.findOne({}, {}, { sort: { id_custom: -1 } });
    const nextUserID = highestUser ? highestUser.game_id + 1 : 10000;
    const accessTokenKey = crypto_1.default.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto_1.default.randomBytes(64).toString("hex");
    const passwordHash = await bcrypt_1.default.hash(req.body.password, 10);
    const code_invite = (0, utils_2.makeid)(5);
    const { user: createdUser, keystore } = await UserRepo_1.default.create({
        account_name: req.body.account_name,
        name: `User` + nextUserID,
        password: passwordHash,
        game_id: nextUserID,
        code_invite,
        parent_code: req.body.parent_code,
        deviceId: req.body.deviceId
    }, accessTokenKey, refreshTokenKey, Role_1.RoleCode.USER);
    const tokens = await (0, authUtils_1.createTokens)(createdUser, keystore.primaryKey, keystore.secondaryKey);
    const userData = await (0, utils_1.getUserData)(createdUser);
    new ApiResponse_1.SuccessResponse("Signup Successful", {
        user: userData,
        tokens: tokens,
    }).send(res);
}));
exports.default = router;
//# sourceMappingURL=signup.js.map