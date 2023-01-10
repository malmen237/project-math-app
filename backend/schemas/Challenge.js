import mongoose from "mongoose";

const ChallengeSchema = mongoose.Schema({
  questions: [],
  userId: String,
  username: String,
  opponentId: String,
  opponentusername: String,
  active: Boolean
});

const Challenge = mongoose.model("Challenge", ChallengeSchema);

export default Challenge;