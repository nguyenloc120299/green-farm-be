import { ProtectedRequest } from "app-request";
import authentication from "../../../auth/authentication";
import { PRICE_LAND_BUY, lands, plants } from "../../../config";
import { BadRequestError } from "../../../core/ApiError";
import { BadRequestResponse, SuccessResponse } from "../../../core/ApiResponse";
import MyLand, { Category } from "../../../database/model/MyLand";
import MyLandRepo from "../../../database/repository/MyLandRepo";
import UserRepo from "../../../database/repository/UserRepo";
import express from "express";
import schema from "./schema";
import asyncHandler from "../../../helpers/asyncHandler";
import _ from "lodash";
import validator from "../../../helpers/validator";

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/

router.post(
  "/buy-land",
  validator(schema.buyLand),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { land_id } = req.body;
    const user = await UserRepo.findPrivateProfileById(req.user._id);
    if (!user) throw new BadRequestError("User not registered");
    const land = lands.find((i) => i.id === land_id);
    if (!land) return new BadRequestResponse("Land not found").send(res);
    if (!user.money_balance || user.money_balance < land.price)
      return new BadRequestResponse("You don't have enough money").send(res);
    const myLand = await MyLandRepo.findByLandId(land_id, user._id);
    if (myLand) return new BadRequestResponse("You bought this land").send(res);
    const newLand = await MyLandRepo.create({
      category: Category.NO_PLANT,
      land_id: land_id,
      user_id: user._id,
    } as MyLand);
    user.money_balance = user.money_balance - PRICE_LAND_BUY;
    await UserRepo.updateInfo(user);
    return new SuccessResponse("Buy success", newLand).send(res);
  })
);

router.post(
  "/plant",
  validator(schema.buyPlant),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { land_id, plant_id } = req.body;
    const user = await UserRepo.findPrivateProfileById(req.user._id);
    if (!user) throw new BadRequestError("User not registered");
    const myLand = await MyLandRepo.findByLandId(land_id, user._id);
    if (!myLand)
      return new BadRequestResponse(
        "You have not purchased this plot of land yet"
      ).send(res);
    if (myLand.category != Category.NO_PLANT)
      return new BadRequestResponse(
        "This plot of land already has plants"
      ).send(res);
    const plantCurrent = plants.find((p) => p.id == plant_id);
    const landCurrent = lands.find((l) => l.id === land_id);
    if (!plantCurrent)
      return new BadRequestResponse("This plant was not found").send(res);
    if (!user.money_balance || user.money_balance < plantCurrent.price)
      return new BadRequestResponse("You don't have enough money").send(res);
    myLand.status = true;
    myLand.plant_id = plant_id;
    myLand.category = Category.PLANTING;
    myLand.time_start = new Date().getTime();
    myLand.time_end = new Date().getTime() + plantCurrent.time_harvest;
    myLand.harvest_balance = plantCurrent.harvest_balance;
    await MyLandRepo.update(myLand);
    user.money_balance = user.money_balance - PRICE_LAND_BUY;
    await UserRepo.updateInfo(user);
    return new SuccessResponse("Planted success", {
      ...myLand,
      ...landCurrent,
    }).send(res);
  })
);

router.post(
  "/havest",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { land_id } = req.body;
    const user = await UserRepo.findPrivateProfileById(req.user._id);
    if (!user) throw new BadRequestError("User not registered");
    const land = lands.find((i) => i.id === land_id);
    if (!land) return new BadRequestResponse("Land not found").send(res);
    const myLand = await MyLandRepo.findByLandId(land_id, user._id);
    if (!myLand || !myLand.time_end)
      return new BadRequestResponse(
        "You have not purchased this plot of land yet"
      ).send(res);
    if (myLand.category != Category.PLANTING)
      return new BadRequestResponse("There are no crops").send(res);
    const plantCurrent = plants.find((p) => p.id == myLand.plant_id);
    if (!plantCurrent)
      return new BadRequestResponse("This plant was not found").send(res);
    if (myLand.time_end > new Date().getTime()) {
      return new BadRequestResponse("It's not harvest time yet").send(res);
    }
    user.gold_balance = myLand.harvest_balance;
    await UserRepo.updateInfo(user);
    myLand.plant_id = null;
    myLand.category = Category.NO_PLANT;
    myLand.time_start = 0;
    myLand.time_end = 0;
    myLand.harvest_balance = 0;
    await MyLandRepo.update(myLand);
    return new SuccessResponse("Havest success", {
      land: { ...myLand, ...land },
      user,
    });
  })
);
export default router;
