const mongoose = require('mongoose');
const { Schema } = mongoose;

const answerSchema = new Schema({
    content: {
      type: String,
      required: true
    },
    user: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    question: {
      type: Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
  });
  
  const Answer = mongoose.model('Answer', answerSchema);
  
  module.exports = Answer;
  