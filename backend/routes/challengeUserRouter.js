import express from "express";
import User from "../schemas/User";

const router = express.Router();

router.post("/", async (req, res) => {
  const { opponent, user } = req.body;

  // Get a random user
  try {

    if (opponent === 'random') {
      User.countDocuments().exec((err, count) => {
        let random = Math.floor(Math.random() * count);
      
        User.findOne().skip(random).exec((err, result) => {
          res.status(200).json({
            success: true,
            response: result
          })
      
        })
      })
    } else {
      const response = await User.findById(opponent);
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