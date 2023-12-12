import { ProtectedRequest } from "app-request";
import authentication from "../../../auth/authentication";
import { lands } from "../../../config";
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
    return new SuccessResponse("Buy success", newLand).send(res);
  })
);
export default router