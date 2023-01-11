/* import React, { useState } from 'react';
import User from './UserSchema';

const FriendRequestForm = () => {
  const [username, setUsername] = useState('');
  const [error, setError] = useState(null);

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Check if the username exists in the database
    const user = await User.findOne({ username });
    if (!user) {
      setError('Username not found');
    } else {
      // Save a new friend request to the database
      const currentUser = await User.findOne({ username: 'currentUser' });
      currentUser.friendRequests.push({ username });
      await currentUser.save();
      setUsername('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="username">
        Send a friend request to:
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)} />
      </label>
      <button type="submit">Send</button>
      {error && <p>{error}</p>}
    </form>
  );
};

export default FriendRequestForm; */

/* import React, { useState } from 'react';

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

export default FriendRequestForm; */