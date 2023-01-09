import mongoose from "mongoose";

const ProblemSchema = mongoose.Schema({
  questions: []
});

const Problem = mongoose.model("Problem", ProblemSchema);

export default Problem;