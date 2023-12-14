"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReferralModel = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "Referral";
exports.COLLECTION_NAME = "Referrals";
const schema = new mongoose_1.Schema({
    parentId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    invited: {
        type: [mongoose_1.Schema.Types.ObjectId],
        required: true,
        ref: "User",
    },
    coinHavest: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    status: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
schema.index({ _id: 1 });
schema.index({ parentId: 1 });
exports.ReferralModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=Referral.js.map