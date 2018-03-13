const express = require("express");
const mongoose = require('mongoose');
const Bucket = require("./models/bucket");
const Todo = require('./models/todo');

const uri = 'mongodb://127.0.0.1:27017/magicbuckets';

const bodyParser = require('body-parser');

mongoose.connect(uri)
const app = express();
const PORT = 8080;
app.use(bodyParser.json());


const todos = [];

const buckets= [];

app.get("/todos", (req, res) => {
	//use .find on our todo model to grab all todo
	Todo
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

app.post("/todos/:todo", (req, res) => {
	// 1. init new TODO instance
	const todo = new Todo({
		description: req.params.todo.split('&')[0],
		assignTo: req.params.todo.split('&')[1],
		type: 'Saving',
		status: 'todo',
		points: 5,
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

app.put("/todos/:index/:nextTodo", (req, res) => {
	const { index, nextTodo } = req.params;
	let todo = todos[index];

	if (todo) {
		todos[index] = nextTodo;
		res.status(200).json({ todo: todos[index] });
	} else {
		res.status(404).json({
			message: "The todo does not exist."
		});
	}
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

app.patch('/todos/:id/complete', (req,res) =>{
	const id = req.params.id;

	Todo
		// 1. fins the todo with the id
		// 2. update the todo
		.findByIdAndUpdate(id, {
			completed: true
		})
			// 3. on sucess send back the todo
		.then(doc =>{
			res.status(200).json({
					message : 'sucess',
					payload : doc
			 });
		})
		// 4. on error send the error
		.catch(err =>{
			res.status(404).json({
				message: err.message
			});
		});
});

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
/* old code
app.get("/buckets", (req, res) => {
  res.status(200).json({ todos });
});


app.post("/todos/:todo", (JSON.parse(req), res) => {
  // const todo = req.params.todo;
  // todos.push(JSON.parse(todo));
  res.status(201).json(todos);
});

app.put("/todos/:index", (req, res) => {
  const { index } = req.params;
  let todo = todos[index];

  if (todo) {
    todos[index] = nextTodo;
    res.status(200).json({ todo: todos[index] });
  } else {
    res.status(404).json({
      message: "The todo does not exist."
    });
  }
});

app.get('/buckets', (req, res) => {
  Bucket.find({})
    .then(docs => {
      res.status(200).send({ buckets: docs })
    })
    .catch(err => {
      res.status(500).send({ message: err.message })
    })
})

app.put("/buckets/:index", (req, res) => {
  const { index } = req.params;
  let bucket = buckets[index];

  if (bucket) {
    buckets[index] = nextBuckets;
    res.status(200).json({ todo: todos[index] });
  } else {
    res.status(404).json({
      message: "The bucket does not exist."
    });
  }
});

app.delete("/todos/:index", (req, res) => {
  const index = req.params.index;
  const todo = todos.splice(index, 1);

  if (todo.length) {
    res.status(200).json({ todo: todo[0] });
  }

  res.status(404).json({
    message: "The todo does not exist."
  });
});
*/

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
