"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "User";
exports.COLLECTION_NAME = "users";
const schema = new mongoose_1.Schema({
    account_name: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        maxlength: 70,
    },
    game_id: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    deviceId: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    name: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
        maxlength: 200,
    },
    parent_code: {
        type: mongoose_1.Schema.Types.String,
        default: "",
    },
    code_invite: {
        type: mongoose_1.Schema.Types.String,
        required: true,
    },
    profile_avatar: {
        type: mongoose_1.Schema.Types.String,
        trim: true,
    },
    active_point: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    gold_balance: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    money_balance: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    email: {
        type: mongoose_1.Schema.Types.String,
        unique: true,
        sparse: true,
        trim: true,
        select: false,
    },
    password: {
        type: mongoose_1.Schema.Types.String,
        select: false,
    },
    roles: {
        type: [
            {
                type: mongoose_1.Schema.Types.ObjectId,
                ref: "Role",
            },
        ],
        required: true,
        select: false,
    },
    verified: {
        type: mongoose_1.Schema.Types.Boolean,
        default: false,
    },
    status: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
    createdAt: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
        select: false,
    },
    updatedAt: {
        type: mongoose_1.Schema.Types.Date,
        required: true,
        select: false,
    },
}, {
    versionKey: false,
});
schema.index({ _id: 1, status: 1 });
schema.index({ email: 1, user_name: 1 });
schema.index({ status: 1 });
exports.UserModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=User.js.map