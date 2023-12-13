import express from "express";
import schema from "./schema";
import { PublicRequest } from "app-request";
import bcrypt from "bcrypt";
import crypto from "crypto";
import { getUserData } from "./utils";
import {
  AuthFailureResponse,
  BadRequestResponse,
  SuccessResponse,
} from "../../../core/ApiResponse";
import validator from "../../../helpers/validator";
import asyncHandler from "../../../helpers/asyncHandler";
import UserRepo from "../../../database/repository/UserRepo";
import KeystoreRepo from "../../../database/repository/KeystoreRepo";
import { createTokens } from "../../../auth/authUtils";

const router = express.Router();

router.post(
  "/basic",
  validator(schema.credential),
  asyncHandler(async (req: PublicRequest, res) => {
    const { account_name, password } = req.body;
    const user = await UserRepo.findByAccountName(account_name);
    if (!user) throw new BadRequestResponse("User not registered").send(res);
    if (!user.password)
      throw new BadRequestResponse("Credential not set").send(res);

    const match = await bcrypt.compare(password, user.password);
    if (!match)
      throw new AuthFailureResponse("Authentication failure").send(res);

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
