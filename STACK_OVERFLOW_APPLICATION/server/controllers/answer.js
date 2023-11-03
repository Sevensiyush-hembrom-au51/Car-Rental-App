const Answer = require('../models/Answer')
const Question = require('../models/Question')

exports.getAllQuestion= async(req,res,next)=>{
        try {
          const questionId = req.params.questionId;

          // Fetch the question with the specified ID
          const question = await Question.findById(questionId).populate(
            "answers"
          );

          if (!question) {
            return res.status(404).json({ message: "Question not found" });
          }

          // Return the answers associated with the question
          res.status(200).json(question.answers);
        } catch (error) {
          console.error("Error fetching answers for question:", error);
          res.status(500).json({ message: "Internal server error" });
        }
   
}