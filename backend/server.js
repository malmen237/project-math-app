import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import crypto from "crypto";
import bcrypt from "bcrypt";

const mongoUrl = process.env.MONGO_URL || "mongodb://localhost/math"
mongoose.connect(mongoUrl, {useNewUrlParser: true, useUnifiedTopology: true})
mongoose.Promise = Promise

// Schema for user information stored in database
const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: true,
    required: true,
  },
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true
  }, 
  accessToken: {
    type: String,
    default: () => crypto.randomBytes(128).toString('hex')
  }
})

const User = mongoose.model("User", UserSchema);

// const QuestionSchema = mongoose.Schema('Question', {
//   ask: {
//     type: String
//   },
//   answer: {
//     type: String
//   }
// })

// const Question = mongoose.model('Question', QuestionSchema)

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
  const { username, password } = req.body;
  try {
    const salt = bcrypt.genSaltSync();
    const anyUser = await User.findOne({username})
    if (anyUser) {
      res.status(400).json({
        success: false,
        response: "Username already in use"
    })} if (password.length < 8) {
          res.status(400).json({
          success: false,
          response: "Password must be at least 8 characters long"
      })
    } else {
        const newUser = await User({username: username, password: bcrypt.hashSync(password, salt)}).save()
        res.status(201).json({
        success: true,
        response: {
          username: newUser.username,
          accessToken: newUser.accessToken,
          id: newUser._id
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
          accessToken: user.accessToken,
          id: user._id
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

// app.get("/welcome", authenticateUser)
// app.get("/welcome", (req, res) => {
//   res.status(200).json({
//     success: true,
//     response: "Welcome! You are logged in"
//   })
// })

// // Get questions/question set from API?
// app.get("/questions", (req, res) => {
  
// })

// Start the server
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
