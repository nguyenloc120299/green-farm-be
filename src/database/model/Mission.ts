import { Schema, model, Types } from "mongoose";

export const DOCUMENT_NAME = "Mission";
export const COLLECTION_NAME = "missions";

export enum Category {
  FARM = "FARM",
  GAME = "GAME",
}

export enum Type_Reward {
  MONEY = "MONEY",
  GOLD = "COIN",
  ACTIVE_POINT = "ACTIVE_POINT",
}

export default interface Referal {
  _id: Types.ObjectId;
  name: string;
  type: string;
  reward: string;
  type_reward: Type_Reward;
  users: Array<Types.ObjectId>;
  category: Category;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<Referal>(
  {
    name: {
      type: Schema.Types.String,
      required: true,
    },
    reward: {},
    category: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(Category),
    },
    type_reward: {
      type: Schema.Types.String,
      required: true,
      enum: Object.values(Type_Reward),
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
