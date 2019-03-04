import Joi from 'joi';

// eslint-disable-next-line import/prefer-default-export
export const messageValidation = (message) => {
  const schema = Joi.object().keys({
    subject: Joi.string().trim().min(5),
    message: Joi.string().trim().min(10),
    parentMessageId: Joi.number().required(),
    status: Joi.string().alphanum().valid('draft', 'sent', 'read')
      .required(),
  });
  return Joi.validate(message, schema);
};
