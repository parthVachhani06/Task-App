const Comment = require('../models/Comment');
const Task = require('../models/Task');


exports.addComment = async (req, res) => {
  try {

    const task = await Task.findById(req.params.taskId);
    if (!task) return res.status(404).json({ error: 'Task not found' });


    const newComment = new Comment({
      text: req.body.text,
      task: req.params.taskId,
      user: req.user.id, 
    });


    const comment = await newComment.save();


    task.comments.push(comment._id);
    await task.save();

    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getComments = async (req, res) => {
  try {
    
    const task = await Task.findById(req.params.taskId).populate('comments');
    if (!task) return res.status(404).json({ error: 'Task not found' });


    res.status(200).json(task.comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

