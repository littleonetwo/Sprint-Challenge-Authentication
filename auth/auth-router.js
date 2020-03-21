const router = require('express').Router();

const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const Users = require('../users/users-model.js');



router.post('/register', async (req, res, next) => {
  // implement registration
  try{
    const { username } = req.body;
    const user = await Users.findBy({ username }).first();

    if(user){
      return res.status(409).json({message: "username is already taken."})
    }

    res.status(201).json(await Users.add(req.body));
  } catch(err) {
    next(err);
  }
});



router.post('/login', async (req, res, next) => {
  // implement login
  const authError = { message:"Invalid Login information"}

  try{
    let { username, password } = req.body;

    const user = await Users.findBy({ username }).first();

    if(!user) {
      return res.status(401).json(authError);
    }

    const passwordValid = await bcrypt.compare(password, user.password);

    if (!passwordValid) {
      return res.status(401).json(authError);
    }

    const payload = { userId: user.id};
    const token = jwt.sign(payload, process.env.JWT_SECRET);
    res.cookie('token', token);

    res.json({
      message:`Welcome ${user.username}!`,
    })
  } catch(err) {
    next(err);
  }
});

module.exports = router;
