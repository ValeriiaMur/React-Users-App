const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const secret = require("../config/secrets")

module.exports = (req, res, next) =>{
    const token = req.headers.authorization;

    //see if there is a token
    if(token){
        //check if valid
        jwt.verify(token, secret.JWT, (err, decodedToken)=>{
            if(err){
                res.status(401).json({err:"not verified"})
            } else {
                //valid
                req.decodedToken = decodedToken;
                next();
            }
        })
    } else {
        res.status(400).json({
            message:"no token"
        })
    }
}