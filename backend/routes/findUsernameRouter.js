import express from "express";
import User from "../schemas/User";

const router = express.Router();

router.get("/", async (req, res) => {
  const {username} = req.query;
  
  const usernameQuery = username ? username : /.*/gm;

  // Get the count of all users
  User.countDocuments().exec(function (err, count) {

  // Get a random entry
  let random = Math.floor(Math.random() * count)

  // Again query all users but only fetch one offset by our random #
  User.findOne().skip(random).exec(
    function (err, result) {
      // Tada! random user
      console.log(result.username) 
    })
  })
  
  try {
    const response = await User.find({username: usernameQuery});
    res.status(200).json({
      success: true,
      response: response
    })
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: "Invalid id-request"
    })
  }
});

export default router;