import express from "express";


const router = express.Router()

router.get("/", (req, res) => {
    res.status(200).json({
      success: true,
      response: "Welcome! You are logged in"
    });
  });

export default router;