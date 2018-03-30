const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const app = express()
const router = require('./routes')
const PORT = 8080

const uri = 'mongodb://localhost:27017/magicbuckets'
mongoose.connect(uri)

const Bucket = require("./models/bucket");
const Todo = require('./models/todo');

app.use(bodyParser.json())

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

	// if (todo) {
	// 	todos[index] = nextTodo;
	// 	res.status(200).json({ todo: todos[index] });
	// } else {
	// 	res.status(404).json({
	// 		message: "The todo does not exist."
	// 	});
	// }
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
