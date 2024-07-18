const Task = require('../models/Task');
const socket = require('../socket');

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user });
    res.json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.createTask = async (req, res) => {
  const { title, description } = req.body;
  try {
    const newTask = new Task({
      user: req.user,
      title,
      description
    });
    const task = await newTask.save();
    socket.getIo().emit('newTask', task);  // Emit event
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  try {
    let task = await Task.findById(id);
    if (!task || task.user.toString() !== req.user) {
      return res.status(404).json({ message: 'Task not found' });
    }
    const { title, description, completed } = req.body;
    task.title = title || task.title;
    task.description = description || task.description;
    task.completed = completed !== undefined ? completed : task.completed;
    await task.save();
    socket.getIo().emit('updateTask', task);  // Emit event
    res.json(task);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  try {
    const task = await Task.findById(id);
    if (!task || task.user.toString() !== req.user) {
      return res.status(404).json({ message: 'Task not found' });
    }
    await task.remove();
    socket.getIo().emit('deleteTask', { id });  // Emit event
    res.json({ message: 'Task removed' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
