"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const authentication_1 = __importDefault(require("../../../auth/authentication"));
const config_1 = require("../../../config");
const ApiError_1 = require("../../../core/ApiError");
const ApiResponse_1 = require("../../../core/ApiResponse");
const MyLand_1 = require("../../../database/model/MyLand");
const MyLandRepo_1 = __importDefault(require("../../../database/repository/MyLandRepo"));
const UserRepo_1 = __importDefault(require("../../../database/repository/UserRepo"));
const express_1 = __importDefault(require("express"));
const schema_1 = __importDefault(require("./schema"));
const asyncHandler_1 = __importDefault(require("../../../helpers/asyncHandler"));
const validator_1 = __importDefault(require("../../../helpers/validator"));
const router = express_1.default.Router();
/*-------------------------------------------------------------------------*/
router.use(authentication_1.default);
/*-------------------------------------------------------------------------*/
router.post("/buy-land", (0, validator_1.default)(schema_1.default.buyLand), (0, asyncHandler_1.default)(async (req, res) => {
    const { land_id } = req.body;
    const user = await UserRepo_1.default.findPrivateProfileById(req.user._id);
    if (!user)
        throw new ApiError_1.BadRequestError("User not registered");
    const land = config_1.lands.find((i) => i.id === land_id);
    if (!land)
        return new ApiResponse_1.BadRequestResponse("Land not found").send(res);
    if (!user.money_balance || user.money_balance < land.price)
        return new ApiResponse_1.BadRequestResponse("You don't have enough money").send(res);
    const myLand = await MyLandRepo_1.default.findByLandId(land_id, user._id);
    if (myLand)
        return new ApiResponse_1.BadRequestResponse("You bought this land").send(res);
    const newLand = await MyLandRepo_1.default.create({
        category: MyLand_1.Category.NO_PLANT,
        land_id: land_id,
        user_id: user._id,
    });
    user.money_balance = user.money_balance - config_1.PRICE_LAND_BUY;
    await UserRepo_1.default.updateInfo(user);
    return new ApiResponse_1.SuccessResponse("Buy success", newLand).send(res);
}));
router.post("/plant", (0, asyncHandler_1.default)(async (req, res) => {
    const { land_id, plant_id } = req.body;
    const user = await UserRepo_1.default.findPrivateProfileById(req.user._id);
    if (!user)
        throw new ApiError_1.BadRequestError("User not registered");
    const myLand = await MyLandRepo_1.default.findByLandId(land_id, user._id);
    if (!myLand)
        return new ApiResponse_1.BadRequestResponse("You have not purchased this plot of land yet").send(res);
    if (myLand.category != MyLand_1.Category.NO_PLANT)
        return new ApiResponse_1.BadRequestResponse("This plot of land already has plants").send(res);
    const plantCurrent = config_1.plants.find((p) => p.id == plant_id);
    if (!plantCurrent)
        return new ApiResponse_1.BadRequestResponse("This plant was not found").send(res);
    if (!user.money_balance || user.money_balance < plantCurrent.price)
        return new ApiResponse_1.BadRequestResponse("You don't have enough money").send(res);
    myLand.status = true;
    myLand.plant_id = plant_id;
    myLand.category = MyLand_1.Category.PLANTING;
    myLand.time_start = new Date().getTime();
    myLand.time_end = new Date().getTime() + plantCurrent.time_harvest;
    myLand.harvest_balance = plantCurrent.harvest_balance;
    await MyLandRepo_1.default.update(myLand);
    user.money_balance = user.money_balance - config_1.PRICE_LAND_BUY;
    await UserRepo_1.default.updateInfo(user);
    return new ApiResponse_1.SuccessResponse("Planted success", myLand).send(res);
}));
exports.default = router;
//# sourceMappingURL=index.js.map