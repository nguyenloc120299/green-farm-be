import authentication from "../../../auth/authentication";
import express from "express";

const router = express.Router();

/*-------------------------------------------------------------------------*/
router.use(authentication);
/*-------------------------------------------------------------------------*/


export default router;