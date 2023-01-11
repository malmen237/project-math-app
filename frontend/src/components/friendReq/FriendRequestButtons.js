import React from 'react';

const FriendRequestButtons = ({ request, handleRequest }) => {
  return (
    <div>
      <button type="button" onClick={() => handleRequest(request.id, true)}>Accept</button>
      <button type="button" onClick={() => handleRequest(request.id, false)}>Reject</button>
    </div>
  );
};

export default FriendRequestButtons;
