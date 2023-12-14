import { model, Schema, Types } from "mongoose";
import Role from "./Role";

export const DOCUMENT_NAME = "User";
export const COLLECTION_NAME = "users";

export default interface User {
  _id: Types.ObjectId;
  name?: string;
  profile_avatar?: string;
  account_name?: string;
  gold_balance?: number;
  money_balance?: number;
  active_point?: number;
  game_id: number;
  email?: string;
  password?: string;
  roles: Role[];
  deviceId?: string;
  parent_code?: string;
  code_invite?: string;
  verified?: boolean;
  status?: boolean;
  createdAt?: Date;
  updatedAt?: Date;
}

const schema = new Schema<User>(
  {
    account_name: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 70,
    },
    game_id: {
      type: Schema.Types.Number,
      required: true,
    },
    deviceId: {
      type: Schema.Types.String,
      required: true,
    },
    name: {
      type: Schema.Types.String,
      trim: true,
      maxlength: 200,
    },
    parent_code: {
      type: Schema.Types.String,
      default: "",
    },
    code_invite: {
      type: Schema.Types.String,
      required: true,
    },
    profile_avatar: {
      type: Schema.Types.String,
      trim: true,
    },
    active_point: {
      type: Schema.Types.Number,
      default: 0,
    },
    gold_balance: {
      type: Schema.Types.Number,
      default: 0,
    },
    money_balance: {
      type: Schema.Types.Number,
      default: 0,
    },
    email: {
      type: Schema.Types.String,
      unique: true,
      sparse: true, // allows null
      trim: true,
      select: false,
    },
    password: {
      type: Schema.Types.String,
      select: false,
    },
    roles: {
      type: [
        {
          type: Schema.Types.ObjectId,
          ref: "Role",
        },
      ],
      required: true,
      select: false,
    },
    verified: {
      type: Schema.Types.Boolean,
      default: false,
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

schema.index({ _id: 1, status: 1 });
schema.index({ email: 1, user_name: 1 });
schema.index({ status: 1 });

export const UserModel = model<User>(DOCUMENT_NAME, schema, COLLECTION_NAME);
