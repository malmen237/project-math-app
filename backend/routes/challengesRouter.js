import express from "express";
import Challenge from "../schemas/Challenge";
import User from "../schemas/User";
import { problemGenerator } from "../functions/problemGenerator";

const router = express.Router();

router.post("/", async (req, res) => {
  const { opponent, user } = req.body;
  let newOpponent = []

  // Get a random user
  if (opponent === 'random') {
    User.countDocuments().exec((err, count) => {
      let random = Math.floor(Math.random() * count)
    
      User.findOne().skip(random).exec((err, result) => {
        newOpponent.push(result.id)
      })
    })
  }

  try {
    let qs = [];
    let setNumber = 0;
    for(let i = 0; i < 10; i++) {
      let operation = ['fr', '-', '/', '*', 'eq', '+'][Math.floor(Math.random() * 6)]
      if (operation === '+' || operation === '-') {
        setNumber = 1000;
      } else if (operation === '*' || operation === '/') {
        setNumber = 12;
      } else if (operation === 'eq' || operation === 'fr') {
        setNumber = 10;
      }
      let q = problemGenerator(setNumber, operation);
      qs.push({question: q.question, answer: q.answer, option: q.option, operation: operation});
    }
    const newOperation = await new Challenge({questions: qs}).save()
    res.status(200).json({
      success: true, 
      response: newOperation
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error
    });
  }
});

export default router;