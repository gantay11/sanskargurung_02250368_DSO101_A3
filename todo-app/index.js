const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static('public'));

// In-memory store
let todos = [];
let nextId = 1;

// GET all todos
app.get('/api/todos', (req, res) => {
  res.json(todos);
});

// POST create a todo
app.post('/api/todos', (req, res) => {
  const { text } = req.body;
  if (!text || text.trim() === '') {
    return res.status(400).json({ error: 'Todo text is required' });
  }
  const todo = { id: nextId++, text: text.trim(), completed: false };
  todos.push(todo);
  res.status(201).json(todo);
});

// PUT update/toggle a todo
app.put('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const todo = todos.find(t => t.id === id);
  if (!todo) return res.status(404).json({ error: 'Todo not found' });
  if (req.body.text !== undefined) todo.text = req.body.text;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;
  res.json(todo);
});

// DELETE a todo
app.delete('/api/todos/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const index = todos.findIndex(t => t.id === id);
  if (index === -1) return res.status(404).json({ error: 'Todo not found' });
  todos.splice(index, 1);
  res.json({ message: 'Todo deleted' });
});

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

const server = app.listen(PORT, () => {
  console.log(`Todo app running on port ${PORT}`);
});

module.exports = { app, server };