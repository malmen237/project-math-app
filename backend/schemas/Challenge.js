import mongoose from "mongoose";

const ChallengeSchema = mongoose.Schema({
  questions: []
});

const Challenge = mongoose.model("Challenge", ChallengeSchema);

export default Challenge;