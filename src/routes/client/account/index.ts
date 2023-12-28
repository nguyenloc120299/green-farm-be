import asyncHandler from "../../../helpers/asyncHandler";
import authentication from "../../../auth/authentication";
import express from "express";
import { ProtectedRequest } from "app-request";
import UserRepo from "../../../database/repository/UserRepo";
import { SuccessResponse } from "core/ApiResponse";

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/

router.get(
  "/ranking",
  asyncHandler(async (req: ProtectedRequest, res) => {
    const users = UserRepo.findUsers()
    return new SuccessResponse('Success',users).send(res)
  })
);

export default router