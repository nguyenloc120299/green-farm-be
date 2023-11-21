import express from "express";

import schema from "./schema";

import { PublicRequest } from "app-request";

import bcrypt from "bcrypt";
import crypto from "crypto";

import { getUserData } from "./utils";
import { SuccessResponse } from "../../../core/ApiResponse";
import validator from "../../../helpers/validator";
import asyncHandler from "../../../helpers/asyncHandler";
import UserRepo from "../../../database/repository/UserRepo";
import { BadRequestError } from "../../../core/ApiError";
import { AuthFailureError } from "../../../core/ApiError";
import KeystoreRepo from "../../../database/repository/KeystoreRepo";
import { createTokens } from "../../../auth/authUtils";

const router = express.Router();

router.post(
  "/basic",
  validator(schema.credential),
  asyncHandler(async (req: PublicRequest, res) => {
    const { account_name, password } = req.body;
    const user = await UserRepo.findByAccountName(account_name);
    if (!user) throw new BadRequestError("User not registered");
    if (!user.password) throw new BadRequestError("Credential not set");

    const match = await bcrypt.compare(password, user.password);
    if (!match) throw new AuthFailureError("Authentication failure");

    const accessTokenKey = crypto.randomBytes(64).toString("hex");
    const refreshTokenKey = crypto.randomBytes(64).toString("hex");

    await KeystoreRepo.create(user, accessTokenKey, refreshTokenKey);
    const tokens = await createTokens(user, accessTokenKey, refreshTokenKey);
    const userData = await getUserData(user);

    new SuccessResponse("Login Success", {
      user: userData,
      tokens: tokens,
    }).send(res);
  })
);

export default router;
