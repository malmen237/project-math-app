/* import React, { useState } from 'react';
import FriendRequestForm from './FriendRequestForm';
import FriendRequestList from './FriendRequestList';

const FriendRequestManager = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const options = {
    method: 'POST', 'GET',  // why error here?
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      operation,
      setNumber,
      opponent: opponent.id, // not correct should be something with user and friend.
      user
    })
  }

  // this fetch needs to be checked, what exactly to fetch?
  fetch(API_URL ('user', options) ) // endpoint should be defined in router, have I done that?
    .then((res) => res.json())
    .then((json) => {
      console.log('json.response', json.response)
})

  return (
    <div>
      <FriendRequestForm setFriendRequests={setFriendRequests} />
      <FriendRequestList friendRequests={friendRequests} />
    </div>
  );
}

export default FriendRequestManager;

/* const handleRequest = async (requestId, accept) => {
    if (accept) {
      // Accept friend request
      // Find the requestee
      const requestee = await User.findOne({ username: 'currentUser' });
      // Find the requester
      const requester = await User.findOne({ username: request.username });
      // add requestee to requester's friends list
      requester.friends.push(requestee.username);
      // add requester to requestee's friends list
      requestee.friends.push(requester.username);
      // save the changes
      await requester.save();
      await requestee.save();
      // remove the request
      requestee.friendRequests = requestee.friendRequests
        .filter((request) => request.id !== requestId);
      // save the changes
      await requestee.save();
      setFriendRequests(requestee.friendRequests);
    } else {
      // Reject friend request
      // Find the current user and remove the request from friendRequest list
      const currentUser = await User.findOne({ username: 'currentUser' });
      currentUser.friendRequests = currentUser.friendRequests
        .filter((request) => request.id !== requestId);
      await currentUser.save();
      setFriendRequests(currentUser.friendRequests);
    }
  };

/* import React, { useState, useEffect } from 'react';
import { MongoClient } from 'mongodb';
import FriendRequestForm from './FriendRequestForm';
import FriendRequestList from './FriendRequestList';

/* const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://127.0.0.1/math';

const FriendRequestManager = () => {
  const [friendRequests, setFriendRequests] = useState([]);
  const [friends, setFriends] = useState([]);

  const sendFriendRequest = (username) => {
    // Add a new friend request to the list of friend requests
    setFriendRequests([...friendRequests, { id: Date.now(), username }]);
  };

  const acceptFriendRequest = (requestId) => {
    // Remove the accepted request from the list of friend requests
    setFriendRequests(friendRequests.filter((request) => request.id !== requestId));
    // Add the new friend to the list of friends
    setFriends([...friends, friendRequests.find((request) => request.id === requestId)]);
  };

  const rejectFriendRequest = (requestId) => {
    // Remove the rejected request from the list of friend requests
    setFriendRequests(friendRequests.filter((request) => request.id !== requestId));
  };

  return (
    <div>
      <h1>Friend Request Manager</h1>
      <FriendRequestForm sendFriendRequest={sendFriendRequest} />
      <FriendRequestList
        friendRequests={friends}
        acceptFriendRequest={acceptFriendRequest}
        rejectFriendRequest={rejectFriendRequest} />
      <h2>Friends</h2>
      <ul>
        {friends.map((friend) => (
          <li key={friend.id}>{friend.username}</li>
        ))}
      </ul>
    </div>
  );
}; */