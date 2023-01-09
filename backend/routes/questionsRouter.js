import express from "express";
import Problem from "../schemas/Problem";
import { gcd } from "mathjs";

const router = express.Router();

const problemGenerator = (numberRange, operation) => {
  const numMax = (operation === 'fr' ? 25 : 10);
  let a = Math.floor(Math.random() * numberRange) + 1;
  let b = Math.floor(Math.random() * numberRange) + 1;
  let c = Math.floor(Math.random() * numberRange) + 1;
  let d = Math.floor(Math.random() * numberRange) + 1;
  let e = Math.floor(Math.random() * numMax) + 1;
  let f = Math.floor(Math.random() * numMax) + 1;
  let g = Math.floor(Math.random() * numMax) + 1;
  let h = Math.floor(Math.random() * numMax) + 1;
  let i = Math.floor(Math.random() * numMax) + 1;
  let j = Math.floor(Math.random() * numMax) + 1;
  let question = "", answer = 0, option=0;

  let commonDivisorEquations = gcd(c - b, a);
  let commonDivisorMultiplication = gcd(a * c, b * d);
  let commonDivisorDivision = gcd(a * d, b * c);
  let commonDivisorAddition = gcd(d * a + b * c, b * d);
  let commonDivisorSubtraction = gcd(d * a - b * c, b * d);

  const numeratorEquations = (c - b) / commonDivisorEquations;
  const denominatorEquations = a / commonDivisorEquations;
  const numeratorMultiplication = (a * c) / commonDivisorMultiplication;
  const denominatorMultiplication = (b * d) / commonDivisorMultiplication;
  const numeratorDivision = (a * d) / commonDivisorDivision;
  const denominatorDivision = (b * c) / commonDivisorDivision;
  const numeratorAddition = (d * a + b * c) / commonDivisorAddition;
  const denominatorAddition = (b * d) / commonDivisorAddition;
  const numeratorSubtraction = (d * a - b * c) / commonDivisorSubtraction;
  const denominatorSubtraction = (b * d) / commonDivisorSubtraction;

  const multiplication = `What is ${a}/${b} * ${c}/${d}?`;
  const division = `What is ${a}/${b} / ${c}/${d}?`;
  const addition = `What is ${a}/${b} + ${c}/${d}?`;
  const subtraction = `What is ${a}/${b} - ${c}/${d}?`;

  const questionFraction = [multiplication, division, addition, subtraction][
    Math.floor(Math.random() * 4)
  ];

  const answerFractions = () => {
    if (numeratorMultiplication === 0 || numeratorDivision === 0 || numeratorAddition === 0 || numeratorSubtraction === 0) {
      return [0];
    } else if (numeratorMultiplication === denominatorMultiplication || numeratorDivision === denominatorDivision || numeratorAddition === denominatorAddition || numeratorSubtraction === denominatorSubtraction) {
      return [1];
    } else if (questionFraction === multiplication) {
      return (
        [numeratorMultiplication, denominatorMultiplication]
      );
    } else if (questionFraction === division) {
      return (
        [numeratorDivision, denominatorDivision]
      );
    } else if (questionFraction === addition) {
      return (
        [numeratorAddition, denominatorAddition]
      );
    } else if (questionFraction === subtraction) {
      return (
        [numeratorSubtraction, denominatorSubtraction]
      );
    }
  };

  const eqOption = [numeratorEquations, denominatorEquations]
  const frOption = answerFractions();
  const dummyOption1 = [e - 5, f];
  const dummyOption2 = [g, h - 5];
  const dummyOption3 = [i, j];

  // TODO: Re-do variable if any 2 are the same

  const fractionsOptions = [frOption, dummyOption1, dummyOption2, dummyOption3];
  const equationsOptions = [eqOption, dummyOption1, dummyOption2, dummyOption3];

  const shuffledFractionsOptions = fractionsOptions.sort(() => {
    return Math.random() - 0.5;
  });

  const shuffledEquationsOptions = equationsOptions.sort(() => {
    return Math.random() - 0.5;
  });
  
  switch(operation) {
    case "+":
      question = `What is ${a} + ${b}?`;
      answer = a + b;
      break;
    case "-":
      question = `What is ${a} - ${b}?`;
      answer = a - b;
      break;
    case "*":
      question = `What is ${a} * ${b}?`;
      answer = a * b;
      break;
    case "/":
      question = `What is ${a} / ${b}?`;
      answer = (Math.round((a / b) * 10) / 10);
      break;
    case "eq":
      question = `In the equation: ${a}x + ${b} = ${c}. What is the value of x?`;
      option = shuffledEquationsOptions;
      answer = eqOption;
      break;
    case "fr":
      question = `${questionFraction}`;
      option = shuffledFractionsOptions;
      answer = answerFractions();
      break;
    default:
      question = "Wrong operation in question!";
  }

  return {question, answer, option};
}

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