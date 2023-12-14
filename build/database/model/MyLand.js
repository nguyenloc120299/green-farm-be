"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.MyLandModel = exports.Category = exports.COLLECTION_NAME = exports.DOCUMENT_NAME = void 0;
const mongoose_1 = require("mongoose");
exports.DOCUMENT_NAME = "MyLand";
exports.COLLECTION_NAME = "my_lands";
var Category;
(function (Category) {
    Category["PLANTING"] = "Planting";
    Category["NO_PLANT"] = "NO_PLANT";
    Category["HARVEST"] = "HARVEST";
})(Category || (exports.Category = Category = {}));
const schema = new mongoose_1.Schema({
    land_id: {
        type: mongoose_1.Schema.Types.Number,
        required: true,
    },
    plant_id: {
        type: mongoose_1.Schema.Types.Number,
    },
    user_id: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "User",
    },
    harvest_balance: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    time_start: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    time_end: {
        type: mongoose_1.Schema.Types.Number,
        default: 0,
    },
    category: {
        type: mongoose_1.Schema.Types.String,
        required: true,
        enum: Object.values(Category),
    },
    status: {
        type: mongoose_1.Schema.Types.Boolean,
        default: true,
    },
}, {
    timestamps: true,
    versionKey: false,
});
schema.index({ _id: 1, status: 1 });
schema.index({ plant_id: 1, user_id: 1 });
exports.MyLandModel = (0, mongoose_1.model)(exports.DOCUMENT_NAME, schema, exports.COLLECTION_NAME);
//# sourceMappingURL=MyLand.js.map