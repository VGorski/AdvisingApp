var express = require('express');
var loginRoute = express.Router();
// Add designated model here
// Add Microsoft database server here

loginRoute
  .route("/")
  .get((req, res, next) => {
    // Get login screen
    res.status(200);
    res.end();
  })
  .post((req, res, next) => {
    // Post the login info to be validated
    res.end();
  });

loginRoute
  .route("/login")
  .get((req, res, next) => {
    // Get login screen
    res.status(200);
    res.end();
  })
  .post((req, res, next) => {
    // Post the login info to be validated
    res.end();
  });

loginRoute
  .route("/register")
  .get((req, res, next) => {
    // Get register screen
    res.status(200);
    res.end();
  })
  .post((req, res, next) => {
    // Post registration form
    res.end();
  });

loginRoute
  .route("/forgotPassword")
  .get((req, res, next) => {
    // Get forgot password screen
    res.status(200);
    res.end();
  })
  .post((req, res, next) => {
    // Post email associated with account
    res.end();
  });

module.exports = loginRoute;