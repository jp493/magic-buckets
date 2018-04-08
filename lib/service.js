const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()

const router = require('./routes')
const config = require('config');

const PORT = process.env.PORT || config.PORT;
const MONGODB_URI = process.env.MONGODB_URI || config.MONGODB_URI;

mongoose.connect(MONGODB_URI)

const Bucket = require("./models/bucket");
const Todo = require('./models/todo');

const findPointsById = (req, res, next) => {
	// console.log('_id:', req.params)
	const _id = req.params._id;
  Bucket.findOne({ _id }).then(bucket => {
    if (bucket) {// console.log(bucket)
      req.points = bucket.points
      next()
    } else {
      res.status(400).json({ message: 'unauthorized' })
    }
  })
}

app.use(bodyParser.json())

app.use('/', express.static(path.join(__dirname, '../build')))

app.use(router)

const buckets= [];
const todos = [];

app.get("/buckets", (req, res) => {
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

app.delete("/buckets/user/:username", (req, res) => {
	const belongsTo = req.params.username;
	Bucket
		.deleteMany({"belongsTo":belongsTo})
		.catch(err =>{
			res.status(500).json({
				message: err.message
			 });
		});
});

app.post("/buckets", (req, res) => {
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

app.delete('/buckets/:id', (req,res) => {
	const id = req.params.id;
	Bucket
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

app.patch('/buckets/:points/:_id', findPointsById, (req,res) =>{
	// const _id = '5a9cae4e12402dc2516d8e02';
	const _id = req.params._id;
	const pt = parseInt(req.params.points);
	const bucket_orig_points = req.points;
	console.log('old bucket point:', bucket_orig_points)
	console.log('_id:', _id)
	Bucket
		.findByIdAndUpdate(_id, {
			points: bucket_orig_points + pt
		})
		.then(doc =>{
			res.status(200).json({
					message : 'successfully completed the mission!',
					payload : doc
			 });
		}).catch(err =>{
			res.status(404).json({
				message: err.message
			});
		});
});

app.patch('/buckets/transfer/:points/:_id', findPointsById, (req,res) =>{
	const _id = req.params._id;
	const pt = parseInt(req.params.points);
	const bucket_orig_points = req.points;
	console.log('old bucket point:', bucket_orig_points)
	console.log('_id:', _id)
	Bucket
		.findByIdAndUpdate(_id, {
			points: bucket_orig_points - pt
		})
		.then(doc =>{
			res.status(200).json({
					message : 'successfully transer points!',
					payload : doc
			 });
		}).catch(err =>{
			res.status(404).json({
				message: err.message
			});
		});
});

app.patch('/buckets/reset/:points/:_id', findPointsById, (req,res) =>{
	const _id = req.params._id;
	const pt = parseInt(req.params.points);
	const bucket_orig_points = req.points;
	Bucket
		.findByIdAndUpdate(_id, {
			points: pt
		})
		.then(doc =>{
			res.status(200).json({
					message : 'successfully reset bucket!',
					payload : doc
			 });
		}).catch(err =>{
			res.status(404).json({
				message: err.message
			});
		});
});

app.get("/todos", (req, res) => {
	Todo
		.find()
		.then(docs =>{
			res.status(200).json({
				message: 'success',
				payload: docs
			 });
		}).catch(err =>{
			res.status(500).json({
				message: err.message
			 });
		});
});

app.get("/todos/:id", (req, res) => {
	const id = req.params.id;
	Todo.findById(id)
		.then(docs =>{
			res.status(200).json({
				message: 'success',
				payload: docs
			 });
		}).catch(err =>{
			res.status(500).json({
				message: err.message
			 });
		});
});

app.post("/todos/:todo", (req, res) => {
	// 1. init new TODO instance
	const todo = new Todo({
		description: req.params.todo.split('&')[0],
		assignTo: req.params.todo.split('&')[1],
		type: req.params.todo.split('&')[3],
		status: 'todo',
		points: parseInt(req.params.todo.split('&')[2]),
		isActive: true
	});

	todo
		.save()
		.then(doc =>{
			res.status(201).json({
				message: 'success',
				payload: doc
			 });
		}).catch(err =>{
				res.status(500).json({
					message: err.message
				 });
		})
});

app.post('/todo/:todo_id/edit', function(req, res) {
	console.log(req.body);
		const {todo_id} = req.params;
    var _id = req.body._id;
    var assignTo = req.body.assignTo;
    var gender = req.body.gender;
    var points = req.body.points;
    var createdBy = req.body.createdBy;
    var status = req.body.status;
    var description = req.body.description;
    var type = req.body.type;
		Todo.findById(todo_id)
		.then(doc => {
			doc.description = description;
			doc.assignTo = assignTo;
			doc.gender = gender;
			doc.type = type;
			doc.status = status;
			doc.points = points;
			doc.createdBy = createdBy;
			doc.isActive = true;
      return doc.save();
    })
    .then(doc => {
      res.status(200).send({ message: "obj added", payload: doc });
    })
    .catch(err => {
      res.status(500).send({ message: err.message });
    });
});

app.put("/todos/:index/:nextTodo", (req, res) => {
	const { index, nextTodo } = req.params;
	console.log(index);
	console.log(JSON.parse(nextTodo));
	console.log("3:"+nextTodo[0]+":end");
	// let todo = todos[index];
	Todo
		.findByIdAndUpdate(index, nextTodo[0]
		)
		.then(doc =>{console.log(doc)
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

app.delete("/todos/:id", (req, res) => {
	const id = req.params.id;
	Todo
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

app.patch('/todos/:id', (req,res) =>{
	const id = req.params.id;
	Todo
		.findByIdAndUpdate(id, {
			status: 'done'
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

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`)
})
