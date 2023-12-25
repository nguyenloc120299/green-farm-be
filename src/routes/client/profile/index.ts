import { ProtectedRequest } from "app-request";
import authentication from "../../../auth/authentication";
import {
  BadRequestResponse,
  SuccessMsgResponse,
  SuccessResponse,
} from "../../../core/ApiResponse";
import UserRepo from "../../../database/repository/UserRepo";
import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import { getUserData } from "../access/utils";
import _ from "lodash";
import validator from "../../../helpers/validator";
import schema from "./schema";
import MyLandRepo from "../../../database/repository/MyLandRepo";
import { RATIO_GOLD, lands } from "../../../config";

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/

router.get(
  "/me",
  asyncHandler(async (req: ProtectedRequest, res) => {
    let myLandData = [] as Array<any>;
    const user = await UserRepo.findPrivateProfileById(req.user._id);
    if (!user) throw new BadRequestResponse("User not registered").send(res);
    const userData = await getUserData(user);
    const myland = await MyLandRepo.findLandByUserId(user._id);

    if (!myland.length) myLandData = lands;
    else {
      const newLandFormat = lands.map((item) => {
        const landBought = _.find(myland, { land_id: item.id });
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
    return new SuccessResponse("success", {
      userData: {
        ...userData,
        landNotBuy: myland?.length || 0,
      },
      myland: myLandData,
    }).send(res);
  })
);

router.put(
  "/me",
  validator(schema.profile),
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findPrivateProfileById(req.user._id);
    if (!user) throw new BadRequestResponse("User not registered").send(res);
    user.name = req.body.name;
    await UserRepo.updateInfo(user);
    const data = _.pick(user, ["name"]);
    return new SuccessResponse("Profile updated", data).send(res);
  })
);

router.put(
  "/swap-coin",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const { gold_amount } = req.body;
    const user = await UserRepo.findPrivateProfileById(req.user._id);
    if (!user) throw new BadRequestResponse("User not registered").send(res);
    if (gold_amount < 10000 || gold_amount > 1000000)
      throw new BadRequestResponse(
        "The minimum amount of gold for exchange is 10,000, and the maximum is 1,000,000."
      ).send(res);

    if (!user.gold_balance)
      throw new BadRequestResponse("You don't have gold").send(res);
    if (user.gold_balance < gold_amount)
      throw new BadRequestResponse("Not enough gold").send(res);
    const money_balance = gold_amount / RATIO_GOLD;
    user.money_balance = (user.money_balance || 0) + money_balance;
    user.gold_balance = user.gold_balance - gold_amount;
    await UserRepo.updateInfo(user);
    return new SuccessResponse("Thành công", { user }).send(res);
  })
);
export default router;
