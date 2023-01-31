import mongoose from "mongoose";

// Schema for users stats to be stored in database
const UserStatsSchema = mongoose.Schema({
    username: {
      type: String,
      required: true,
    },
    quiztype: {
      type: String
    },
    category: {
      type: String
    },
    score: {
      type: Number
    },
    points: {
      type: Number
    },
    time: {
      type: String
    },
    opponent: {
      type: String
    }
  });
  
  const UserStats = mongoose.model("UserStats", UserStatsSchema);

  export default UserStats;