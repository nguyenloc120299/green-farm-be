import { ProtectedRequest } from "app-request";
import authentication from "auth/authentication";
import { BadRequestResponse, SuccessResponse } from "core/ApiResponse";
import UserRepo from "database/repository/UserRepo";
import express from "express";
import asyncHandler from "helpers/asyncHandler";
import { getUserData } from "../access/utils";
import _ from "lodash";
import validator from "helpers/validator";
import schema from "./schema";
import MyLandRepo from "database/repository/MyLandRepo";

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/

router.get(
  "/me",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const user = await UserRepo.findPrivateProfileById(req.user._id);
    if (!user) throw new BadRequestResponse("User not registered").send(res);
    const userData = getUserData(user);
    const myland = MyLandRepo.findLandByUserId(user._id); 
    return new SuccessResponse("success", {
      userData,
      myland,
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
