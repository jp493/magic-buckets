const express = require("express");
const Router = express.Router;
const router = Router();
const Bucket = require("../models/bucket");
const { verifyToken } = require("../middleware/magicbuckets");

router.get("/", verifyToken, (req, res) => {
	Bucket
		.find()
		.then(docs =>{
				//IF we find send them back to use
			res.status(200).json({
				message: 'success',
				payload: docs
			 });
		}).catch(err =>{
				//If error send an error to user
			res.status(500).json({
				message: err.message
			 });
		});
});

app.post("/", verifyToken, (req, res) => {
	const {type,isFull,points,belongsTo} = req.body;
	// const id = '5a9cae4e12402dc2516d8e02';

	const bucket = new Bucket({ type, isFull, points, belongsTo });

	Bucket.find()
		// .populate("user")
		.then(docs => {
			res.status(200).json({
					message: "success",
					payload: docs
			});
		});

	bucket
		.save()
		.then(doc => {
			res.status(201).json({
				message: 'success',
				payload: doc
			});
		})
		.catch(err => {
			res.status(500).json({
				message: err.message
			});
		});
});

app.patch('/buckets/:points', verifyToken, (req,res) =>{
	const _id = '5a9cae4e12402dc2516d8e02';

	const pt = parseInt(req.params.points);
	Bucket
		.findByIdAndUpdate(_id, {
			points: pt
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

app.patch('/buckets/transfer/:points', verifyToken, (req,res) =>{
	const transfer_bucket = req.params.points.split('&')[0];
	const _id = (transfer_bucket === 'Giving')?"5aa9d3f193804043db11c691":"5aa9d42293804043db11c692"; //Henry's
	const transfer_to = req.params.points.split('&')[1];
	Bucket
		.findByIdAndUpdate(_id, {
			points: transfer_to
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
