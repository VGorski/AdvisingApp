var express = require('express');
var loginRoute = express.Router();
// Add designated model here
// Add Microsoft database server here
var user = require('../models/advisorModel');
var jsonToken = require('jsonwebtoken');

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
    var { email, password } = req.body;

    // User did not put in the email and / or password
    if (!email || !password) {
      return res.status(500).json({message: 'Email and password are required!'})
    }


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
    // Create a new user with the gathered information
    var newUser = new user({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: req.body.password,
      role: req.body.role
    });

    // Check to see if this user exists or not
    let promise = new Promise(newUser);
    
    // User does not exist so a new account can be created
    promise.then(function (checkUser) {
      return res.status(200).json(checkUser);
    })

    // User already exists so return an error
    promise.catch(function (err) {
      return res.status(500).json({message: 'This user already exists!'})
    })

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