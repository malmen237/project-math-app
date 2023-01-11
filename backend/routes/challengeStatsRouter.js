import express from "express";
import Challenge from "../schemas/Challenge";

const router = express.Router();

router.patch("/", async (req, res) => {
    const { matchId } = req.body;
    try {
        const r = await Challenge.updateOne({id: matchId}, {opponentusername: 'false'})
        console.log(r)
        res.status(201).json({
        success: true,
        response: 'Match finished'
      })
    } catch (error) {
        res.status(400).json({
          success: false,
          response: error
        });
    }
  });

  export default router;