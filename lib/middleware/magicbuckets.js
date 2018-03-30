const jwt = require('jsonwebtoken')
const config = require('../config.json')

const Bucket = require("../models/bucket");
const Todo = require('../models/todo');
const User = require('../models/user');

const tokenService = require('../tokenService')

const findUserByEmail = (req, res, next) => {// next()-issueToken is to send to the next func
  const { email } = req.body
  User.findOne({ email }).then(user => {
    if (user) {
      req.user = user
      next()
    } else {
      res.status(400).json({ message: 'unauthorized' })
    }
  })
}

const issueToken = (req, res, next) => {
  const { password } = req.body
  const { user } = req
  user
        .comparePassword(password)
        .then(isMatch => {
          if (isMatch) {
            const token = tokenService.create(user)
            res.status(200).json({
              message: 'success',
              payload: token
            })
          } else {
            res.status(400).json({ message: 'unauthorized' })
          }
        })
}

const verifyToken = (req, res, next) => {
	console.log('Auth',req.get('authentication'))
	var authHeader = req.get('authentication')

  // var authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWFiN2IwMjg5MTdlMGY3MjhkOTQwNzU1In0sImlhdCI6MTUyMjI4OTEzOH0.uTL7ioQb40pyhRs5G1gHdC8BwSxCqvOxGBVEakNLrdk'; //req.get('authorization')

	// var authHeader = 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNWFhZWNiYmI3NzVhNzY1Mzk2M2YyMWViIn0sImlhdCI6MTUyMjM1MjE5Nn0.2_1PJEn7ZYmyxAoN7tDEQXqKMPviujKClHbYNoocspQ';

  if (!authHeader) {
    res.status(401).json({
      message: 'unauthorized'
    })
  }
  const token = authHeader.split(' ')[1] // grab just the token
  jwt.verify(token, config.secret, (err, decoded) => {
    if (err) res.status(401).json({ message: 'forbidden' })

    if (decoded) {
      req.token = decoded
      next()
    }
  })
}

module.exports = {
  issueToken,
  findUserByEmail,
  verifyToken
}
