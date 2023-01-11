import express from "express";
import User from "../schemas/User";

const router = express.Router();

router.post("/", async (req, res) => {
  const { opponent, user } = req.body;
  console.log(opponent)
  console.log(user)

  // Get a random user
  try {

    if (opponent === 'random') {
      User.countDocuments().exec((err, count) => {
        let random = Math.floor(Math.random() * count);
      
        User.findOne().skip(random).exec((err, result) => {
          const response = {username: result.username, id: result.id}
          res.status(200).json({
            success: true,
            response: response
          })
      
        })
      })
    } else {
      const opponentInfo = await User.findById(opponent);
      const response = {username: opponentInfo.username, id: opponentInfo.id}
      res.status(200).json({
        success: true,
        response: response
      })  
    }

  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: "Invalid id-request"
    })
  }

});

export default router;