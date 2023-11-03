const mongoose = require('mongoose');
const { Schema } = mongoose;
const questionSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  tags: [
    {
      type: String
    }
  ],
  likes: {
    type: Number,
    default: 0
  },
  answers: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Answer'
    }
  ]
});

const Question = mongoose.model('Question', questionSchema);

module.exports = Question;
