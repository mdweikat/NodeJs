const mongoose = require('mongoose');
const _ = require('lodash');

var TodoSchema = new mongoose.Schema({
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
}, { usePushEach: true });

TodoSchema.methods.toJSON = function() {
  var todo = this;
  var todoObj = todo.toObject();

  return _.pick(todoObj, ['text', 'completed', 'completedAt']);
};

var Todo = mongoose.model('Todo', TodoSchema);

module.exports = {Todo};
