import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import { gcd } from "mathjs";

const mongoUrl = process.env.MONGO_URL || "mongodb://127.0.0.1/math"
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = Promise

mongoose.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: (doc, converted) => {
    delete converted._id;
  }
});

// Schema for user information stored in database
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  }, 
  email: {
    type: String,
    required: true
  },
  friendrequest: [

  ],
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const User = mongoose.model("User", UserSchema);

// ADDED:
// Schema for users stats to be stored in database
const UserStatsSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  quizType: {
    type: String
  },
  score: {
    type: Number
  },
  points: {
    type: Number
  },
  time: {
    type: Number
  },
  opponent: {
    type: String
  }
})

const UserStats = mongoose.model("UserStats", UserStatsSchema);

// Defines the port the app will run on. Defaults to 8080, but can be overridden
// when starting the server. Example command to overwrite PORT env variable value:
// PORT=9000 npm start
const port = process.env.PORT || 8080;
const app = express();

// Add middlewares to enable cors and json body parsing
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send([
    { "API": "Math-questions" },
    { "path": "/games", "url": 'https://project-math', "methods": ["GET", "POST", "PUT", "DELETE"] }
  ]);
});

//REGISTER
app.post("/register", async (req, res) => {
  const { username, password, email } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    const anyUser = await User.findOne({username})
    if (anyUser) {
      res.status(400).json({
        success: false,
        response: "Username already in use"
      })
    } else if (password.length < 8) {
          res.status(400).json({
          success: false,
          response: "Password must be at least 8 characters long"
      })
    } else {
        const newUser = await User({username: username, email: email, password: bcrypt.hashSync(password, salt)}).save()
        res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          email: newUser.email,
          id: newUser.id
        }
      })
    }
  } catch (error) {
      res.status(400).json({
        success: false,
        response: error
      })
  }
})

//LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({username})
    if (user && bcrypt.compareSync(password, user.password)) {
      res.status(200).json({
        success: true,
        response: {
          username: user.username,
          email: user.email,
          accessToken: user.accessToken,
          id: user.id
        }
      }) 
    } else {
        res.status(400).json({
          success: false,
          response: "Credentials did not match"
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      response: error
    })
  }
})

// AUTHENTICATED ENDPOINT, accessible only when logged in
const authenticateUser = async (req, res, next) => {
  const accessToken = req.header("Authorization")
  try {
    const user = await User.findOne({accessToken})
    if (user) {
      next()
    } else {
      res.status(401).json({
        success: false,
        response: "Please log in"
      })
    }
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error
    })
  }
}

app.get("/welcome", authenticateUser)
app.get("/welcome", (req, res) => {
  res.status(200).json({
    success: true,
    response: "Welcome! You are logged in"
  });
});

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

  const answerEquations = () => {
    if (numeratorEquations === 0) {
      return [0];
    } else if (numeratorEquations === denominatorEquations) {
      return [1];
    } else {
      return (
        [numeratorEquations, denominatorEquations]
      );
    }
  };

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

  const eqOption = answerEquations();
  const frOption = answerFractions();
  const dummyOption1 = [e - 5, f - 5];
  const dummyOption2 = [g, h];
  const dummyOption3 = [i, j];

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
      answer = answerEquations();
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

const ProblemSchema = mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: []
  },
  option: {
    type: []
  },
  operation: {
    type: String,
  }
});

const Problem = mongoose.model("Problem", ProblemSchema);

app.post("/questions", async (req, res) => {
  const {operation, setNumber} = req.body;
  try {
    let q = problemGenerator(setNumber, operation);
    const newOperation = await new Problem({question: q.question, answer: q.answer, option: q.option, operation: operation}).save()
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

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
