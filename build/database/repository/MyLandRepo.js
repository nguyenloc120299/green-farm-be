"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const MyLand_1 = require("../../database/model/MyLand");
async function findById(id) {
    return MyLand_1.MyLandModel.findOne({ _id: id, status: true }).lean().exec();
}
async function create(land) {
    const created = await MyLand_1.MyLandModel.create(land);
    return created.toObject();
}
async function update(land) {
    return MyLand_1.MyLandModel.findByIdAndUpdate(land._id, land, { new: true })
        .lean()
        .exec();
}
async function findByLandId(land_id, user_id) {
    return MyLand_1.MyLandModel.findOne({
        land_id,
        user_id
    })
        .lean()
        .exec();
}
async function findLandByUserId(user_id) {
    return MyLand_1.MyLandModel.find({
        user_id
    })
        .lean()
        .exec();
}
exports.default = {
    findById,
    create,
    update,
    findByLandId,
    findLandByUserId
};
//# sourceMappingURL=MyLandRepo.js.map