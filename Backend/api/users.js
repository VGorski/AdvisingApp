// Authors: Timothy Carta and Victoria Gorski

const express = require("express");
const loginRouter = express.Router();
const Advisor = require("../models/advisorModel");
const Advisee = require("../models/adviseeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Register API
loginRouter.post("/register", (req, res) => {
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };
  // Check if the email and password fields are empty
  if (
    req.body.email == undefined ||
    req.body.email == "" ||
    req.body.password == undefined ||
    req.body.password == ""
  ) {
    res.status(401).json({
      message: "You must fill out all fields",
      status: res.status,
    });
  } else {
    // Check if the email exists in the database
    Advisor.findOne({
      attributes: ["email"],
      where: {
        email: req.body.email,
      },
    }).then((value) => {
      // Hash the given password
      bcrypt.genSalt(10, function (error, salt) {
        bcrypt.hash(credentials.password, salt, (error, hash) => {
          console.log(hash);
          // Create a new advisor user with the following information
          Advisor.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            role: req.body.role,
            discipline: req.body.discipline,
          }).then(() => {
            // Notify the user that an advisor account has successfully been created
            res
              .status(201)
              .json({
                message: "An advisor has successfully been created",
                status: res.status,
              })
              // Notify the user that something went wrong with creating the user
              .catch((error) =>
                res.status(404).json({
                  message:
                    "An error has occured while creating an advisor user",
                })
              );
          });
        });
      });
    });
  }
});

// Login API
loginRouter.post("/login", (req, res) => {
  // Check if all the fields are filled out
  if (
    req.body.email == undefined ||
    req.body.email == "" ||
    req.body.password == undefined ||
    req.body.password == ""
  ) {
    res.status(401).json({
      message: "You must fill out all fields",
      status: res.status,
    });
  } else {
    // Check if the email exists in the database for an advisee user
    Advisee.findOne({
      where: {
        email: req.body.email,
      },
    }).then((value) => {
      // If an advisee does not exist, check for an advisor user instead
      if (value === null) {
        Advisor.findOne({
          where: {
            email: req.body.email,
          },
        }).then((value) => {
          if (value === null) {
            // An advisor user was not found
            res.status(401).json({
              message: "No advisor account",
              status: res.status,
              jwt: "",
            });
          } else {
            // An advisor user has been found, check password
            const checkPassword = value.getDataValue("password");
            bcrypt.compare(
              req.body.password,
              checkPassword,
              function (error, validity) {
                // If the login information is valid, get the user data from the database
                if (validity) {
                  const userCredentials = {
                    email: value.getDataValue("email"),
                    id: value.getDataValue("advisor_id"),
                    role: value.getDataValue("role"),
                  };
                  // Create a jsonwebtoken to be passed between pages
                  const token = jwt.sign(
                    userCredentials,
                    process.env.SECRET_KEY,
                    { expiresIn: "1200s" }
                  );
                  // Print out user information for developer testing only
                  res.status(200).json({
                    message: userCredentials,
                    status: 200,
                    data: {
                      token: token,
                      id: userCredentials.id,
                      role: userCredentials.role,
                    },
                  });
                } else {
                  // Notify that the password is wrong
                  res.status(401).json({
                    message: "Wrong password",
                    status: res.status,
                    token: "",
                  });
                }
              }
            );
          }
        });
      } else {
        // Continue to check if user is an advisee
        const checkPassword = value.getDataValue("password");
        // Check if password is correct
        bcrypt.compare(
          req.body.password,
          checkPassword,
          function (error, validity) {
            // If the password is correct, get user information from database
            if (validity) {
              const userCredentials = {
                email: value.getDataValue("email"),
                id: value.getDataValue("advisee_id"),
              };
              // Create jsonwebtoken to be passed between pages
              const token = jwt.sign(userCredentials, process.env.SECRET_KEY, {
                expiresIn: "1200s",
              });
              // Print out information for developer testing only
              res.status(200).json({
                message: "Logged in as an advisee",
                status: 200,
                data: {
                  token: token,
                  id: userCredentials.id,
                },
              });
            } else {
              // Notify user of wrong password
              res.status(401).json({
                message: "Wrong password",
                status: res.status,
                token: "",
              });
            }
          }
        );
      }
    });
  }
});

module.exports = loginRouter;
