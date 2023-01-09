import express from "express";
import Problem from "../schemas/Problem";
import { problemGenerator } from "../functions/problemGenerator";

const router = express.Router();

router.post("/", async (req, res) => {
  const {operation, setNumber} = req.body;
  try {
    let qs = [];
    for(let i = 0; i < 10; i++) {
      let q = problemGenerator(setNumber, operation);
      qs.push({question: q.question, answer: q.answer, option: q.option, operation: operation});
    }
    const newOperation = await new Problem({questions: qs}).save()
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