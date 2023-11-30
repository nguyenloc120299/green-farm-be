import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "MyLand";
export const COLLECTION_NAME = "MyLands";

export enum Category {
  PLANTING = "Planting",
  NO_PLANT = "NO_PLANT",
  HARVEST = "HARVEST",
}

export default interface MyLand {
  _id: Types.ObjectId;
  plant_id?: number;
  user_id: Types.ObjectId;
  land_id: number;
  category: Category;
  harvest_balance?: number;
  time_start?: number;
  time_end?: number;
  status?: boolean;
}

const schema = new Schema<MyLand>(
  {
    land_id: {
      type: Schema.Types.Number,
      required: true,
    },
    plant_id: {
      type: Schema.Types.Number,
    },
    user_id: {
      type: Schema.Types.ObjectId,
      ref: "User",
    },
    harvest_balance: {
      type: Schema.Types.Number,
      default: 0,
    },
    time_start: {
      type: Schema.Types.Number,
      default: 0,
    },
    time_end: {
      type: Schema.Types.Number,
      default: 0,
    },
    category: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(Category),
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

schema.index({ _id: 1, status: 1 });
schema.index({ plant_id: 1, user_id: 1 });

export const MyLandModel = model<MyLand>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
