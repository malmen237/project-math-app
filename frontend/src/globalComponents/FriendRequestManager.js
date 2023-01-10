import React from 'react';
import FriendRequestForm from './FriendRequestForm';
import FriendRequestList from './FriendRequestList';

function createFriendRequestManager() {
  return class FriendRequestManager extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        friendRequests: [], // this will hold the list of friend requests
        username: '' // this will hold the username that is being requested
      };
      // .bind to pass the data as an argument to the function of a class based component
      this.handleUsernameChange = this.handleUsernameChange.bind(this);
      this.handleSubmit = this.handleSubmit.bind(this);
      this.handleAccept = this.handleAccept.bind(this);
      this.handleReject = this.handleReject.bind(this);
    }

    componentDidMount() {
    // fetch friend requests from backend here
      fetch('/api/friend-requests/')
        .then((response) => response.json())
        .then((friendRequests) => this.setState({ friendRequests }));
    }

    handleUsernameChange(event) {
      this.setState({ username: event.target.value });
    }

    handleSubmit(event) {
      event.preventDefault();
      // send request to backend to check if username exists
      // if it does, add friend request to list
      fetch('/api/friend-requests/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: this.state.username })
      })
        .then((response) => response.json())
        .then((newRequest) => {
          this.setState((prevState) => ({
            friendRequests: [...prevState.friendRequests, newRequest]
          }));
        });
    }

    handleAccept(request) {
    // send request to backend to accept friend request
      fetch(`/api/friend-requests/${request.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: 'accepted' })
      })
        .then(() => {
        // remove request from list
          this.setState((prevState) => ({
            friendRequests: prevState.friendRequests.filter((r) => r.id !== request.id)
          }));
        });
    }

    handleReject(request) {
    // send request to backend to reject friend request
      fetch(`/api/friend-requests/${request.id}`, {
        method: 'DELETE'
      })
        .then(() => {
        // remove request from list
          this.setState((prevState) => ({
            friendRequests: prevState.friendRequests.filter((r) => r.id !== request.id)
          }));
        });
    }

    render() {
      return (
        <div>
          <FriendRequestForm
            username={this.state.username}
            onUsernameChange={this.handleUsernameChange}
            onSubmit={this.handleSubmit} />
          <FriendRequestList
            friendRequests={this.state.friendRequests}
            onAccept={this.handleAccept}
            onReject={this.handleReject} />
        </div>
      );
    }
  }
}
export default createFriendRequestManager;

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
};

export default FriendRequestManager; */