
import Joi from "joi";

export default {
  profile: Joi.object().keys({
    name: Joi.string().trim().length(5).required(),
  }),
};
