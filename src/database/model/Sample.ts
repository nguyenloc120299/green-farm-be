import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Referal";
export const COLLECTION_NAME = "Referals";

export enum Category {
  ABC = "ABC",
  XYZ = "XYZ",
}

export default interface Referal {
  _id: Types.ObjectId;
  category: Category;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Referal>(
  {
    category: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(Category),
    },
    status: {
      type: Schema.Types.Boolean,
      default: true,
    },
    createdAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
    updatedAt: {
      type: Schema.Types.Date,
      required: true,
      select: false,
    },
  },
  {
    versionKey: false,
  }
);

export const ReferalModel = model<Referal>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
