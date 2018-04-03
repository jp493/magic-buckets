const express = require('express')
const Router = express.Router
const router = Router()
const User = require('../models/user')

const { verifyToken } = require('../middleware/magicbuckets')

router.get('/current', verifyToken, (req, res) => {
  const { user } = req.token
	console.log(user);

  if (user && user.id) {
    User.findById(user.id)
            .then(user => {
              res.status(200).send({
                message: 'success',
                payload: user
              })
            })
  } else {
    res.status(401).send({
      message: 'forbidden'
    })
  }
});

router.delete("/:id", (req, res) => {
	const id = req.params.id;
	console.log('id', id)
	User
		.findByIdAndRemove(id)
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

router.get("/all", (req, res) => {
  // const { user } = req.token;
	console.log('token:',req.token)
  User.find()
    .then(docs => {
			console.log('docs: ', docs)
      res.status(200).send({
        message: "success",
        payload: docs
      });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});


module.exports = router
