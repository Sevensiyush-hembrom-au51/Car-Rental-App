const express = require("express");
const router = express.Router();
const Answer = require("../models/Answer");
const Question = require("../models/Question");
const ctrl = require("../controllers/answer");

// Get all answers for a question
router.get("/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;

    // Fetch the question with the specified ID
    const question = await Question.findById(questionId).populate("answers");

    if (!question) {
      return res.status(404).json({ message: "Question not found" });
    }

    // Return the answers associated with the question
    res.status(200).json(question);
  } catch (error) {
    console.error("Error fetching answers for question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

// router.get("/:questionId", ctrl.getAllQuestion);

// Add an answer to a question
router.post("/:questionId", async (req, res) => {
  try {
    const questionId = req.params.questionId;
    const { content, userId } = req.body;

    // Create a new answer
    const answer = new Answer({
      content,
      user: userId,
      question: questionId,
    });

    // Save the answer to the database
    await answer.save();

    // Find the question and update its answers array
    const question = await Question.findById(questionId);
    question.answers.push(answer);
    await question.save();

    res.status(201).json(answer);
  } catch (error) {
    console.error("Error adding answer to question:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
