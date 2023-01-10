import mongoose from "mongoose";

const ChallengeSchema = mongoose.Schema({
  questions: [],
  user: String,
  opponent: String
});

const Challenge = mongoose.model("Challenge", ChallengeSchema);

export default Challenge;