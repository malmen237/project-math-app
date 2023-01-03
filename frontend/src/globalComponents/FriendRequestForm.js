import React, { useState } from 'react';

const FriendRequestForm = ({ sendFriendRequest }) => {
  const [friendUsername, setFriendUsername] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    sendFriendRequest(friendUsername);
    setFriendUsername('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="requests">
        Enter a friends username:
        <input
          type="text"
          value={friendUsername}
          onChange={(event) => setFriendUsername(event.target.value)} />
      </label>
      <button type="submit">Send Friend Request</button>
    </form>
  );
};

export default FriendRequestForm;