import express from "express";
import Challenge from "../schemas/Challenge";

const router = express.Router();

router.get("/:id", async (req, res) => {

  try {
    const getChallenge = await Challenge.find({ opponent: req.params.id })
    res.status(200).json({
      success: true, 
      response: getChallenge
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      response: error
    });
  }
});

export default router;