/*
  complete the middleware code to check if the user is logged in
  before granting access to the next middleware/route handler
*/
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Users = require('../users/users-model.js');

function restrict() {

  const authError = {
       you: 'shall not pass!'
  }

  return async (req, res, next) => {
    try{
      const { token } = req.cookies;

      if(!token){
        return res.status(401).json(authError);
      }

      jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
          if(err){
            return res.status(401).json(authError);
          }
          req.token = decoded;
          next();
      })
      } catch(err) {
        next(err);
      }
    }
  }

module.exports = restrict;
