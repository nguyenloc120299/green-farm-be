import express from "express";
import { Permission } from "../../database/model/Apikey";
import apikey from "../../auth/apikey";
import permission from "../../helpers/permission";
import signup from "./access/signup";
import login from "./access/login";

const router = express.Router();

/*---------------------------------------------------------*/
router.use(apikey);

router.use(permission(Permission.GENERAL));

/*---------------------------------------------------------*/
/*---------------------------------------------------------*/

router.use("/signup", signup);
router.use("/login", login);

export default router;
