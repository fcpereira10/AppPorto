'use strict';

const { validationResult } = require('express-validator');

const checkExpressValidators = validators => async (
  req,
  res,
  next,
) => {
  await Promise.all(validators.map(validator => validator.run(req)));

  const errors = validationResult(req);
  if (errors.isEmpty()) {
    return next();
  }
  return res.status(422).json({ errors: errors.array() });
};

module.exports = { checkExpressValidators };
