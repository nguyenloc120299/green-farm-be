"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Apikey_1 = require("../../database/model/Apikey");
const apikey_1 = __importDefault(require("../../auth/apikey"));
const permission_1 = __importDefault(require("../../helpers/permission"));
const signup_1 = __importDefault(require("./access/signup"));
const login_1 = __importDefault(require("./access/login"));
const profile_1 = __importDefault(require("./profile"));
const land_1 = __importDefault(require("./land"));
const router = express_1.default.Router();
/*---------------------------------------------------------*/
router.use(apikey_1.default);
router.use((0, permission_1.default)(Apikey_1.Permission.GENERAL));
/*---------------------------------------------------------*/
/*---------------------------------------------------------*/
router.use("/signup", signup_1.default);
router.use("/signin", login_1.default);
router.use("/profile", profile_1.default);
router.use("/farm", land_1.default);
exports.default = router;
//# sourceMappingURL=index.js.map