const express = require('express');
const app = express();
const cors = require('cors');
const PORT = 8080;

const bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());


var todos = [{
	id: 1,
	description: 'Feed the fish',
	assignTo: 'Henry',
	gender: 'B',
	points: 5,
	isActive: false,
	createdBy: '2017-3-25',
	type: 'Saving',
	status: 'todo'
},
{
	id: 2,
	description: 'Read chess book page 10-50',
	assignTo: 'Henry',
	gender: 'B',
	points: 10,
	isActive: true,
	createdBy: '2018-1-12',
	type: 'Saving',
	status: 'in progress'
},
{
	id: 3,
	description: 'Practise piano for 30 minutes',
	assignTo: 'Faustine',
	gender: 'G',
	points: 8,
	isActive: true,
	createdBy: '2018-2-01',
	type: 'Saving',
	status: 'todo'
},
{
	id: 4,
	description: 'Sleep before 10:00 p.m.',
	assignTo: 'Faustine',
	gender: 'G',
	points: 10,
	isActive: true,
	createdBy: '2018-2-01',
	type: 'Saving',
	status: 'todo'
},
{
	id: 5,
	description: 'Sleep before 9:30 p.m.',
	assignTo: 'Henry',
	gender: 'B',
	points: 5,
	isActive: true,
	createdBy: '2018-2-01',
	type: 'Saving',
	status: 'in progress'
},
{
	id: 6,
	description: 'Eat 10 broccoli',
	assignTo: 'Henry',
	gender: 'B',
	points: 5,
	isActive: true,
	createdBy: '2018-2-01',
	type: 'Saving',
	status: 'done'
}];

var buckets =[
{
	id: 1,
	type: 'Saving',
	points: 50,
	isFull: false,
	belongsTo: 'Henry'
},
{
	id: 2,
	type: 'Giving',
	points: 0,
	isFull: false,
	belongsTo: 'Henry'
},
{
	id: 3,
	type: 'Spending',
	points: 0,
	isFull: false,
	belongsTo: 'Henry'
},
{
	id: 4,
	type: 'Saving',
	points: 50,
	isFull: false,
	belongsTo: 'Faustine'
},
{
	id: 5,
	type: 'Giving',
	points: 0,
	isFull: false,
	belongsTo: 'Faustine'
},
{
	id: 6,
	type: 'Spending',
	points: 0,
	isFull: false,
	belongsTo: 'Faustine'
}];

app.get('/todos', (req, res) => {
	res.status(200).json({
		success: true,
		items: todos
	});
});

app.get('/buckets', (req, res) => {
	res.status(200).json({
		success: true,
		items: buckets
	});
});

app.put('/buckets/:points', (req,res) => {
	const pts = req.params.points;
	buckets[0].points += parseInt(pts);//TODO: index needs to be dynamic, not 0
	const newBuckets = buckets;
	res.status(200).json({newBuckets})
});

app.post('/todos/:todo', (req, res)=> {
	const todo = req.params.todo.split('&')[0];
	console.log('todo: '+todo);
	const assignTo = req.params.todo.split('&')[1];
	console.log('assignTo: '+assignTo);
	todos.push(Object.assign({},
		{
			id:todos.length+1,
			description:todo,
			assignTo:assignTo,
			type:'Saving',
			status:'todo',
			points:5,
			isActive:true
		}));
	res.send(todos);
	res.status(201).json({
		success: true,
		todo: todo
	});
});

app.delete('/todos/:index', (req, res)=> {// e.g.: /todos/2 - reomve the third item
	const index = req.params.index;
	todos = todos
				.filter((item, index) => item.assignTo.includes('Henry') && item.isActive && item.type.includes('Saving'));

	const removed = todos.splice(index, 1);

	if (removed.length === 0) {
		res.status(404).json({
			success: false,
			message: "No todo found at that index."
		});
	}

	res.status(202).json({
		success: true,
		todo: removed
	});
});

// app.put('/todos/:index/:newStatus', (req,res) => {
app.put('/todos/:index', (req,res) => {
	const index = req.params.index;
	console.log('index: '+index);
	todos = todos
				.filter((item, index) => item.assignTo.includes('Henry') && item.isActive && item.type.includes('Saving'));
	todos[index].status = 'done';
	const newTodo = todos;

	console.log('status: '+todos[index].status);
	res.status(200).json({newTodo})
});

/*
// in TodoApp.js
completeTodo = (id) => {
	axios.patch(`/todos/${id}/complete`)
	.then(this.refresh);//retrieve data
}
// in ShowTodo.js
<Todo
	completeTodo={completTodo}
	completed={todo.completed}

//Todo.js
{completed === true ?
	<del>{description}</del> :description
}

<button onCLink={()=>completedTodo(id)}>Completed Todo</button>

app.patch('/todos/:id/complete', (req,res) => {
	const id = req.params.id;
	Todo.findByIdAndUpdate(id, {
		completed: true
})
	.then(doc => {

	})
	.catch(err => {
		res.status(500).json({message: err.message})
	});
});
*/

// app.listen(PORT);
// console.log('port is 8080!');

app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}.`);
});
