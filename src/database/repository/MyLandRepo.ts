import MyLand, { MyLandModel } from "database/model/MyLand";
import { Types } from "mongoose";

async function findById(id: Types.ObjectId): Promise<MyLand | null> {
  return MyLandModel.findOne({ _id: id, status: true }).lean().exec();
}

async function create(land: MyLand): Promise<MyLand> {
  const created = await MyLandModel.create(land);
  return created.toObject();
}

async function update(land: MyLand): Promise<MyLand | null> {
  return MyLandModel.findByIdAndUpdate(land._id, land, { new: true })
    .lean()
    .exec();
}

async function findByLandId(land_id: number,user_id:Types.ObjectId): Promise<MyLand | null> {
  return MyLandModel.findOne({
    land_id,
    user_id
  })
    .lean()
    .exec();
}
async function findLandByUserId(user_id:Types.ObjectId): Promise<MyLand[] | []> {
  return MyLandModel.find({
    user_id
  })
    .lean()
    .exec();
}

export default {
  findById,
  create,
  update,
  findByLandId,
  findLandByUserId
};
