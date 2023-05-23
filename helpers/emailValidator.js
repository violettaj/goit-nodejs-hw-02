const Joi = require("joi");

const emailValidator = (data) =>
  Joi.object()
    .options({ abortEarly: false })
    .keys({
      email: Joi.string()
        .email({ minDomainSegments: 2, tlds: { allow: ["com", "net", "ua"] } })
        .required(),
    })
    .validate(data);

module.exports = emailValidator;
