var jwt = require('jsonwebtoken');
const express = require('express');
const JWT_SECRET = 'Harryisagoodb$oy';

const fetchuser = (req, res, next) => {
    // Get the user from the jwt token and add id to req object
    const token = req.header('auth-token');
    // console.log(token);
    if(!token){
        // console.log("if block");
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
    try {
        // console.log("try block");
        const data = jwt.verify(token, JWT_SECRET);
        req.user = data.user;
        next();
    } catch (error) {
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
}

module.exports = fetchuser;