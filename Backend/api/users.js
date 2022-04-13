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
      bcrypt.genSalt(10, function (error, salt) {
        bcrypt.hash(credentials.password, salt, (error, hash) => {
          console.log(hash);
          Advisor.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hash,
            role: req.body.role,
            discipline: req.body.discipline,
          }).then(() => {
            res
              .status(201)
              .json({
                message: "An advisor has successfully been created",
                status: res.status,
              })
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
    // Check if the email exists in the database for an advisee
    Advisee.findOne({
      where: {
        email: req.body.email,
      },
    }).then((value) => {
      if (value === null) {
        Advisor.findOne({
          where: {
            email: req.body.email,
          },
        }).then((value) => {
          if (value === null) {
            res.status(401).json({
              message: "No advisor account",
              status: res.status,
              jwt: "",
            });
          } else {
            const checkPassword = value.getDataValue("password");
            bcrypt.compare(
              req.body.password,
              checkPassword,
              function (error, validity) {
                if (validity) {
                  const userCredentials = {
                    email: value.getDataValue("email"),
                    id: value.getDataValue("advisor_id"),
                    role: value.getDataValue("role"),
                  };

                  const token = jwt.sign(
                    userCredentials,
                    process.env.SECRET_KEY,
                    { expiresIn: "1200s" }
                  );
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
        const checkPassword = value.getDataValue("password");
        bcrypt.compare(
          req.body.password,
          checkPassword,
          function (error, validity) {
            if (validity) {
              const userCredentials = {
                email: value.getDataValue("email"),
                id: value.getDataValue("advisee_id"),
              };

              const token = jwt.sign(userCredentials, process.env.SECRET_KEY, {
                expiresIn: "1200s",
              });

              res.status(200).json({
                message: "Logged in as an advisee",
                status: 200,
                data: {
                  token: token,
                  id: userCredentials.id,
                },
              });
            } else {
              // Wrong password
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
