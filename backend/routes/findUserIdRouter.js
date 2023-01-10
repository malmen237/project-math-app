import express from "express";
import User from "../schemas/User";

const router = express.Router();

router.get("/:id", async (req, res) => {
  try {
    const singleUser = await User.findById(req.params.id)
    if (singleUser) {
      res.status(200).json({
        success: true,
        response: singleUser
      })
    } else {
      res.status(404).json({
        success: false,
        error: "Not Found"
      })
    } 
  } catch (err) {
    res.status(400).json({ 
      success: false,
      error: "Invalid id-request"
    });
  }
});

export default router;