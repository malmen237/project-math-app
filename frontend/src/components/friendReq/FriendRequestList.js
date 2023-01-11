import React from 'react';
import FriendRequest from './FriendRequest';

const FriendRequestList = ({ friendRequests }) => {
  return (
    <div>
      {friendRequests.map((request) => (
        <div key={request.id}>
          <FriendRequest request={request} />
        </div>
      ))}
    </div>
  );
};

export default FriendRequestList;
