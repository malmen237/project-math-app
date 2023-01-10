import express from "express";
import UserStats from "../schemas/UserStats";
// import authenticateUser from "../server";


const router = express.Router()

// Get user's statistics to date
// router.get("/:username", authenticateUser)
router.get("/:username",  async (req, res) => {
  const { username } = req.params;
  try {
    // Get best stats among all registered users
    const bestOfAllChalStat = await UserStats.find({ quiztype: 'challenge' }).sort({ score: 'desc' }).limit(1)

    // Get specific user's statistics
    const trainStats = await UserStats.find({ username: username, quiztype: 'training' }).sort({ score: 'desc' })
    const challengeStats = await UserStats.find({ username: username, quiztype: 'challenge' }).sort({ score: 'desc' })

    const topTrainStat = trainStats[0]
    const topChallengeStat = challengeStats[0]

    if (trainStats.length > 0 || challengeStats.length > 0){
      res.status(200).json({
        success: true,
        response: { 
          trainStats: trainStats,
          challengeStats: challengeStats,
          topTrainStat: topTrainStat,
          topChallengeStat: topChallengeStat,
          bestOfAllChalStat: bestOfAllChalStat
        }
    })} else {
      res.status(404).json({ 
        sucess: false,
        response: 'No stats found' 
      })
    }
  } catch (error) {
      res.status(400).json({
        success: false,
        response: error
      })
  }
});

// Update user's statistics with latest results
// router.post("/", authenticateUser)
router.post("/", async (req, res) => {
  const { username, quiztype, category, score, points, time, opponent } = req.body;
  try {
    const newStat = await new UserStats({username: username, quiztype: quiztype, category: category, score: score, points: points, time: time, opponent: opponent}).save()
    res.status(201).json({
        success: true,
        response: {
          username: newStat.username,
          quiztype: newStat.quiztype,
          category: newStat.category,
          score: newStat.score,
          points: newStat.points, 
          time: newStat.time, 
          opponent: newStat.opponent
        }
    })
  } catch (error) {
      res.status(400).json({
      success: false,
      response: error
    })
  }
});

export default router;