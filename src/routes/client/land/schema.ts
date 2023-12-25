import Joi from "joi";

export default {
  buyLand: Joi.object().keys({
    land_id: Joi.number().required(),
  }),
  buyPlant: Joi.object().keys({
    land_id: Joi.number().required(),
    plant_id: Joi.number().required(),
  }),
  havestPlant: Joi.object().keys({
    land_id: Joi.number().required(),
  }),
};
