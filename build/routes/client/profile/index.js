"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("../../../auth/authentication"));
const ApiResponse_1 = require("../../../core/ApiResponse");
const UserRepo_1 = __importDefault(require("../../../database/repository/UserRepo"));
const express_1 = __importDefault(require("express"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const utils_1 = require("../access/utils");
const lodash_1 = __importDefault(require("lodash"));
const validator_1 = __importDefault(require("../../../helpers/validator"));
const schema_1 = __importDefault(require("./schema"));
const MyLandRepo_1 = __importDefault(require("../../../database/repository/MyLandRepo"));
const config_1 = require("../../../config");
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
router.use(authentication_1.default);
/*-------------------------------------------------------------------------*/
router.get("/me", (0, asyncHandler_1.default)(async (req, res) => {
    let myLandData = [];
    const user = await UserRepo_1.default.findPrivateProfileById(req.user._id);
    if (!user)
        throw new ApiResponse_1.BadRequestResponse("User not registered").send(res);
    const userData = await (0, utils_1.getUserData)(user);
    const myland = await MyLandRepo_1.default.findLandByUserId(user._id);
    if (!myland.length)
        myLandData = config_1.lands;
    else {
        const newLandFormat = config_1.lands.map((item) => {
            const landBought = lodash_1.default.find(myland, { land_id: item.id });
            if (landBought)
                return {
                    ...landBought,
                    ...item,
                };
            return {
                ...item,
                land_id: item.id,
            };
        });
        myLandData = newLandFormat;
    }
    return new ApiResponse_1.SuccessResponse("success", {
        userData: {
            ...userData,
            landNotBuy: (myland === null || myland === void 0 ? void 0 : myland.length) || 0,
        },
        myland: myLandData,
    }).send(res);
}));
router.put("/me", (0, validator_1.default)(schema_1.default.profile), (0, asyncHandler_1.default)(async (req, res) => {
    const user = await UserRepo_1.default.findPrivateProfileById(req.user._id);
    if (!user)
        throw new ApiResponse_1.BadRequestResponse("User not registered").send(res);
    user.name = req.body.name;
    await UserRepo_1.default.updateInfo(user);
    const data = lodash_1.default.pick(user, ["name"]);
    return new ApiResponse_1.SuccessResponse("Profile updated", data).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map