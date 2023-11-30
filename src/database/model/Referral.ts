import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Referral";
export const COLLECTION_NAME = "Referrals";

export default interface Referral {
  _id: Types.ObjectId;
  parentId: Types.ObjectId;
  invited: Array<Types.ObjectId>;
  coinHavest?: Number;
  status?: boolean;
}

const schema = new Schema<Referral>(
  {
    parentId: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    invited: {
      type: [Schema.Types.ObjectId],
      required: true,
      ref: "User",
    },
    coinHavest: {
      type: Schema.Types.Number,
      default: 0,
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

schema.index({ _id: 1 });
schema.index({ parentId: 1 });

export const ReferralModel = model<Referral>(
  DOCUMENT_NAME,
  schema,
  COLLECTION_NAME
);
