import React, { useState } from 'react';
import FriendRequestForm from './FriendRequestForm';
import FriendRequestList from './FriendRequestList';

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
        friendRequests={friendRequests}
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
};

export default FriendRequestManager;