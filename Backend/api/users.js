const express = require("express");
const loginRouter = express.Router();
const Advisee = require("../models/adviseeModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

// Login API
loginRouter.post("/login", (req, res) => {
    const credentials = {
        email,
        password,
    } = req.body;
});

// Check if all the fields are filled out
if (email == undefined || email == "" || password == undefined || password == "") {
    res.status(401).json({
        message: "You must fill out all fields",
        status: res.status
    });
} else {
    // Check if the email exists in the database
    Advisee.findOne({
        where: {
            email
        }
    }).then((value) => {
        if(value === null) {
            res.status(401).json({
                message: "No account could be found",
                status: res.status,
                jwt: ""
            });
        } else {
            // Email does exist, so check the password
            const checkPassword = value.getDataValue('password');
            bcrypt.compare(password, checkPassword, function(error, validity) {
                if(validity) {
                    // If password matches, then user is good to go
                    const userCredentials = {
                        email:value.getDataValue("email"),
                        id:value.getDataValue("advisee_id")
                    };

                    const token = jwt.sign(userCredentials, process.env.SECRET_KEY, {expiresIn: "120s"});

                    res.status(200).json({
                        message: "Hopefully logged in",
                        status: res.status,
                        token
                    });
                } else {
                    // Nope, wrong password
                    res.status(401).json({
                        message: "Wrong password",
                        status: res.status,
                        token: ""
                    });
                };
            }); 
        };
    });
};
/* 
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
    })
    
}); */

module.exports = router;