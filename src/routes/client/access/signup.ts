import express from "express";
import { BadRequestResponse, SuccessResponse } from "../../../core/ApiResponse";
import { RoleRequest } from "app-request";
import crypto from "crypto";
import UserRepo from "../../../database/repository/UserRepo";

import User from "../../../database/model/User";
import { createTokens } from "../../../auth/authUtils";
import validator from "../../../helpers/validator";
import schema from "./schema";
import asyncHandler from "../../../helpers/asyncHandler";
import bcrypt from "bcrypt";
import { RoleCode } from "../../../database/model/Role";
import { getUserData } from "./utils";
import { makeid } from "../../../utils";

const router = express.Router();

router.post(
  "/basic",
  validator(schema.signup),
  asyncHandler(async (req: RoleRequest, res) => {
    const user = await UserRepo.findByAccountName(req.body.account_name);

    if (user) throw new BadRequestResponse("User already registered").send(res);

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");

    const passwordHash = await bcrypt.hash(req.body.password, 10);
    const code_invite = makeid(5);
    const { user: createdUser, keystore } = await UserRepo.create(
      {
        account_name: req.body.account_name,
        name: req.body.name,
        password: passwordHash,
        code_invite,
        parent_code: req.body.parent_code,
      } as User,
      accessTokenKey,
      refreshTokenKey,
      RoleCode.USER
    );

    const tokens = await createTokens(
      createdUser,
      keystore.primaryKey,
      keystore.secondaryKey
    );
    const userData = await getUserData(createdUser);

    new SuccessResponse("Signup Successful", {
      user: userData,
      tokens: tokens,
    }).send(res);
  })
);

export default router;
