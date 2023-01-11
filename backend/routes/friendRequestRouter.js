import express from 'express';
import User from "../schemas/User";

const router = express.Router();

// const User = 
// insteade of requestee use "user" and requester "friend"
router.post("/", async (req, res) => { 
  const { user } = req.body;
  // Post is correct when adding info
  try {
    // Search in User schema for a user with a matching username
    const requestee = await User.findOne({ username: user });
    if(requestee){
    // new friend request object
    const newRequest = {
      requesterUsername: req.body.requester,
      status: 'pending',
    }
    // add the new request to the requestee's friend requests list?
    requestee.friendrequests.push(newRequest);
    await requestee.save();

    res.status(201).json({ message: 'Friend request sent' });
    }else{
       res.status(404).json({ message: 'Requestee not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error sending friend request' });
  }
});
// maybe use username instead?
router.get("/:username", async (req, res) => {
 // const { user } = req.body; 
 const { username } = req.params;
  try {
    // find the requestee
    const requestee = await User.findOne({username : username});
    if(requestee){
    // find the friend request by id and update the status
    requestee.friendrequests = requestee.friendrequests.map(request => {
        if (request.id == req.params.id) {
            request.status = 'accepted';
        }
        return request;
    });
    // add the requester to the requestee's friends list
    requestee.friends.push(request.requesterUsername);
    await requestee.save();
    res.status(200).json({ message: 'Friend request accepted' });
    }else{
      res.status(404).json({ message: 'Requestee not found' });
    }
  } catch (err) {
    res.status(500).json({ message: 'Error accepting friend request' });
  }
});

      
      export default router;