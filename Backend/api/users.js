// Control + shift + p, format (forced)

const express = require("express");
const loginRouter = express.Router();
const Advisee = require("../models/adviseeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const saltRounds = 10;
var password = "password";

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
    Advisee.findOne({
      attributes: ["email"],
      where: {
        email: req.body.email,
      },
    }).then((value) => {
      bcrypt.genSalt(10, function (error, salt) {
        bcrypt.hash(credentials.password, salt, (error, hash) => {
          console.log(hash);
          Advisee.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            advisor_id: req.body.advisor_id,
            password: hash,
          }).then((value) => {
            res
              .status(201)
              .json({
                message: "Yeet",
                status: res.status,
              })
              .catch((error) =>
                res.status(404).json({
                  message: "Nope",
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
  const credentials = {
    email: req.body.email,
    password: req.body.password,
  };

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
    // Check if the email exists in the database
    Advisee.findOne({
      where: {
        email: req.body.email,
      },
    }).then((value) => {
      if (value === null) {
        res.status(401).json({
          message: "No account could be found",
          status: res.status,
          jwt: "",
        });
      } else {
        // Email does exist, so check the password
        const checkPassword = value.getDataValue("password");
        /*             bcrypt.hash("password").then(hash => {
                console.log(hash);
            }); */
        bcrypt.compare(
          req.body.password,
          checkPassword,
          function (error, validity) {
            if (validity) {
              // If password matches, then user is good to go
              const userCredentials = {
                email: value.getDataValue("email"),
                id: value.getDataValue("advisee_id"),
              };

              const token = jwt.sign(userCredentials, process.env.SECRET_KEY, {
                expiresIn: "1200s",
              });

              res.status(200).json({
                message: "Hopefully logged in",
                status: 200,
                data:{
                  'token': token,
                  'id': userCredentials.id
                }
              });

              
            } else {
              // Nope, wrong password
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


// User info API
loginRouter.get("/userCredentials", (req, res) => {
    const authenticate = req.header['authorization'];
    if(authenticate) {
        // Give the user a security token
        const token = authenticate.substr("Bearer".length, +1);
        jwt.verify(token, process.env.SECRET_KEY, (error, login) => {
            if(login) {
                // Send the login info just to make sure you got the right user
                res.statusCode(200).json ({
                    message: "login success",
                    status: res.status,
                    data: login
                })
            }
        })
    } else {
    // User hasn't logged in so you have to tell them that 
    res.status(401).json({
        message: "You haven't logged in yet",
        status: res.status  
    });
    
}});

module.exports = loginRouter;
