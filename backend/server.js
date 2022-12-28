import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";
import equationData from "./data/equations.json";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/math"
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
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const User = mongoose.model("User", UserSchema);

// Schema for equations stored in the database
const EquationSchema = mongoose.Schema({
  number: {
    type: Number
  },
  text: {
    type: String
  },
  question: {
    type: String
  },
  answers: {
    type: Array
  },
  correct_answer: {
    type: Number
  }
})

const Equation = mongoose.model("Equation", EquationSchema); 

// Generate entries into the db from the json file:
if (process.env.RESET_DB) {
  const resetDataBase = async () => {
    await Equation.deleteMany();
    equationData.forEach((equation) => {
      const newEquation = new Equation(equation);
      newEquation.save();
    })
  }
  resetDataBase();
}


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
    { "path": "/games", "url": 'https://project-math', "methods": ["GET", "POST"] }
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
  })
})


const problemGenerator = (numberRange, operation) => {
  let a = Math.floor(Math.random() * numberRange) + 1;
  let b = Math.floor(Math.random() * numberRange) + 1;
  let question = "", answer = 0;
  
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
    default:
      question = "Wrong operation in question!";
  }

  return {question, answer};
}


const ProblemSchema = mongoose.Schema({
  question: {
    type: String,
  },
  answer: {
    type: Number,
  },
  operation: {
    type: String,
  }
});

const Problem = mongoose.model("Problem", ProblemSchema);

app.post("/questions", async (req, res) => {
  const {operation} = req.body;
  try {
    let q = problemGenerator(12, operation);
    const newOperation = await new Problem({question: q.question, answer: q.answer, operation: operation}).save()
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

// SEPARATE ENDPOINT FOR EQUATIONS?
app.get("/equations", async (req, res) => {
  try {
    const equations = await Equation.find()
    if (equations.length > 0) {
      res.status(200).json(equations)
    } else {
      res.status(404).json({ error: 'No equations found' })
    }
  } catch (error) {
    res.status(400).json({ error: 'Sumting wong' })
  }
})

// app.get("/questions", async (req, res) => {
//   try {
//     let q = problemGenerator(12, ['*', '+', '/', '-'][Math.floor(Math.random() * 4)]);
//     const newProblem = await new Problem({question: q.question, answer: q.answer}).save()
//     res.status(200).json({
//       success: true, 
//       response: newProblem
//     });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       response: error
//     });
//   }
// });

// Get questions/question set from API?
// app.get("/set", (req, res) => {
     // generate a set of questions
     // save them to the database?
     // list them at the endpoint
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
