import { JoiObjectId } from "helpers/validator";
import Joi from "joi";

export default {
  buyLand: Joi.object().keys({
    land_id: Joi.number().required(),
  }),
};
