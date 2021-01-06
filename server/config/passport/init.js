'use strict';

const login = require('./login');

module.exports = function init(passport) {
  passport.serializeUser((user, done) => {
    done(null, user);
  });

  passport.deserializeUser((user, done) => {
    done(null, user);
  });

  login(passport);
};
