const express = require('express');
const router = express.Router();
const Question = require('../models/Question.js');


// Get all questions
router.get('/', async (req, res) => {
  try {
    // Fetch all questions from the database
    const questions = await Question.find().sort({ likes: -1 }); // Sort by number of likes in descending order

    res.status(200).json(questions);
  } catch (error) {
    console.error('Error fetching questions:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


// Fetch a question by ID
router.get('/:id', async (req, res) => {
  try {
    const questionId = req.params.id;
    // Find the question by ID
    const question = await Question.findById(questionId);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    res.status(200).json(question);
  } catch (error) {
    console.error('Error fetching question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



// Add a new question
router.post('/', async (req, res) => {
  try {
    const { title, description, tags } = req.body;

    // Create a new question
    const newQuestion = new Question({
      title,
      description,
      tags,
    });

    // Save the question to the database
    const savedQuestion = await newQuestion.save();

    res.status(201).json(savedQuestion);
  } catch (error) {
    console.error('Error adding question:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});


module.exports = router;
