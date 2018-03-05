const express = require("express");
const PORT = 8080;

const app = express();

const todos = [];

app.get("/todos", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}.`);
});
