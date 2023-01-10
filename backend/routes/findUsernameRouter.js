import express from "express";
import User from "../schemas/User";

const router = express.Router();

router.get("/", async (req, res) => {
  const {username} = req.query;
  
  const usernameQuery = username ? username : /.*/gm;
  
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