import express from "express";
import UserStats from "../schemas/UserStats";
// import authenticateUser from "../server";


const router = express.Router()

// Get user's statistics to date
// router.get("/:username", authenticateUser)
router.get("/:username",  async (req, res) => {
  const { username } = req.params;
  try {
    // const allStats = await UserStats.find({ username: username }).sort({ score: 'desc' })
    const trainStats = await UserStats.find({ username: username, quiztype: 'training' }).sort({ score: 'desc' })
    const challengeStats = await UserStats.find({ username: username, quiztype: 'challenge' }).sort({ score: 'desc' })

    // const topTrainStat = await UserStats.find({ username: username, quiztype: 'training' }).sort({ score: 'desc' }).limit(1)
    // const topChallengeStat = await UserStats.find({ username: username, quiztype: 'challenge' }).sort({ score: 'desc' }).limit(1)
    // const worstTrainStat = await UserStats.find({ username: username, quiztype: 'training' }).sort({ score: 'desc' }).limit(1)
    // const worstChallengeStat = await UserStats.find({ username: username, quiztype: 'challenge' }).sort({ score: 'desc' }).limit(1)
    const topTrainStat = trainStats[0]
    const topChallengeStat = challengeStats[0]
    const worstTrainStat = trainStats[trainStats.length - 1]
    const worstChallengeStat = challengeStats[challengeStats.length - 1]

    if (trainStats.length > 0 || challengeStats.length > 0){
      res.status(200).json({
        success: true,
        response: { 
          topTrainStat: topTrainStat,
          topChallengeStat: topChallengeStat,
          worstTrainStat: worstTrainStat,
          worstChallengeStat: worstChallengeStat,
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