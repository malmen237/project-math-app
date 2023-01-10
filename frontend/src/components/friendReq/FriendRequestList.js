import React from 'react';
// import { useNavigate } from 'react-router-dom';

const FriendRequestList = ({ friendRequests, acceptFriendRequest, rejectFriendRequest }) => {
  return (
    <ul>
      {friendRequests.map((request) => (
        <li key={request.id}>
          {request.username}
          <button type="button" onClick={() => acceptFriendRequest(request.id)}>Accept</button>
          <button type="button" onClick={() => rejectFriendRequest(request.id)}>Reject</button>
        </li>
      ))}
    </ul>
  );
};

export default FriendRequestList;