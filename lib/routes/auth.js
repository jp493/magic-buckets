const express = require('express')
const Router = express.Router
const router = Router()
const { findUserByEmail, issueToken } = require('../middleware/magicbuckets')
const User = require('../models/user')

router.post('/signin', findUserByEmail, issueToken)

// localhost:808/auth/signup, root path sets up in index.js
router.post('/signup', (req, res) => {
  const { email, password, username } = req.body
  const user = new User({ email, password, username })
  user
    .save()
    .then(doc => {
      res.status(200).json({
        message: 'success',
        payload: doc
      })
    })
    .catch(err => {
      res.status(500).json({ message: err.message })
    })
})

router.patch('/signup/:id', (req,res) =>{
	const id = req.params.id.split('&')[0];
	const username = req.params.id.split('&')[1];
	User
		.findByIdAndUpdate(id, {
			username: username
		})
		.then(doc =>{
			res.status(200).json({
					message : 'sucess',
					payload : doc
			 });
		}).catch(err =>{
			res.status(404).json({
				message: err.message
			});
		});
});

module.exports = router
