const express = require("express");
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jwt = require("jsonwebtoken");
const config = require('./config.json');
const tokenService = require("./tokenService");

const Bucket = require("./models/bucket");
const Todo = require('./models/todo');
const User = require('./models/user');

const app = express();
const PORT = 8080;

app.use(bodyParser.json());

const uri = 'mongodb://127.0.0.1:27017/magicbuckets';
mongoose.connect(uri)

const todos = [];
const buckets= [];

app.post('/signin', (req, res) => {
	const { email, password } = req.body;

	User
		.findOne({ email })
		.then(user => {
			if (user) {
				user
					.comparePassword(password)
					.then((isMatch)=> {
						if (isMatch) {
							const token = tokenService.create(user);
							res.status(200).send({
								message: 'success',
								payload: token
							});
						} else {
							res.status(400).send({
								message:'unauthorized'
							});
						}
					});
			} else {
				res.status(401).send({
					message:'forbidden'
				});
			}
		});
});

app.post("/signup", (req, res) => {
	const { email, password } = req.body;
	console.log(req.body);
	const user = new User({
		email,
		password
	});
	user
		.save()
		.then(doc => {
			res.status(200).json({
				message: 'success',
				payload: doc
			})
		})
		.catch(err => {
			res.status(500).json({
				message: err.message
			})
		})
});

app.get("/user/current", (req, res) => {
	const authHeader = req.get("authorization");

	if (!authHeader) {
		res.status(401).send({message: 'forbidden'})
	}
	const token = authHeader.split(" ")[1];
	jwt.verify(token, config.secret, (err, decoded) => {
		if (err) {
			res.status(401).send({
				message: 'forbidden'
			})
		}
		const { id } = decoded.user;

		User.findById(id).then(doc => {
			if (doc) {
				res.status(200).send({
					message: 'success',
					payload: doc
				})
			} else {
				res.status(401).send({
					message: 'forbidden'
				})
			}
		})
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

app.patch('/buckets/:points', (req,res) =>{
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

app.patch('/buckets/transfer/:points', (req,res) =>{
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
