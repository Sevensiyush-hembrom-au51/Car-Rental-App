const express = require("express");
const router = express.Router();
const Question = require("../models/Question.js");
const Answer = require("../models/Answer");

// Search questions by tags or title (case-insensitive)
router.get("/search", async (req, res) => {
  try {
    let SearchKey = req.query.SearchKey;
    let regexPattern;
    if (SearchKey.length === 1) {
      // Handle single character input differently
      regexPattern = new RegExp(`^${SearchKey}$`, "i");
    } else {
      regexPattern = new RegExp(SearchKey, "i");
    }

    const questions = await Question.find({
      $or: [
        { tags: { $in: [regexPattern] } },
        { title: regexPattern },
        { description: regexPattern },
      ],
    }).sort({ likes: -1 });

    // Fetch the answer(s) related to the fetched questions
    const answerIds = questions.map((question) => question.answers).flat();
    const answers = await Answer.find({ _id: { $in: answerIds } });

    // Assign the fetched answers to the respective questions
    const questionsWithAnswers = questions.map((question) => {
      const questionAnswers = answers.filter((answer) =>
        question.answers.includes(answer._id)
      );
      return { ...question.toObject(), answers: questionAnswers };
    });

    if (questionsWithAnswers.length > 0) {
      res
        .status(200)
        .json({
          message: "Fetched all the question with answers successfully!",
          result: questionsWithAnswers,
        });
    } else {
      res
        .status(200)
        .json({
          message:
            "no result matched Please try again with different keywords!",
          result: [],
        });
    }
  } catch (error) {
    console.error("Error searching questions:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
