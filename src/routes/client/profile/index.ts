import { ProtectedRequest } from "app-request";
import authentication from "../../../auth/authentication";
import { BadRequestResponse, SuccessResponse } from "../../../core/ApiResponse";
import UserRepo from "../../../database/repository/UserRepo";
import express from "express";
import asyncHandler from "../../../helpers/asyncHandler";
import { getUserData } from "../access/utils";
import _ from "lodash";
import validator from "../../../helpers/validator";
import schema from "./schema";
import MyLandRepo from "../../../database/repository/MyLandRepo";
import { lands } from "../../../config";

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
        userData,
        landNotBuy: myland?.length  || 0,
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

export default router;
