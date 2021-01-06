'use strict';

const jwt = require('express-jwt');

function jwtSecret() {
  return "secret";
}

const getTokenFromHeaders = req => {
  const {
    headers: { authorization },
  } = req;
  if (authorization && authorization.split(' ')[0] === 'Token') {
    return authorization.split(' ')[1];
  }
  return null;
};

const check = {
  required: jwt({
    secret: jwtSecret(),
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
  }),
  optional: jwt({
    secret: jwtSecret(),
    userProperty: 'payload',
    getToken: getTokenFromHeaders,
    credentialsRequired: false,
  }),
};


module.exports = {
  check
};
