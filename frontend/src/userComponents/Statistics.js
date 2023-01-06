import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

const Statistics = () => {
  const [stats, setStats] = useState([]);
  console.log('stats', stats)

  const username = useSelector((state) => state.user.username);
  console.log('username in statistics', username)

  // Get users results from database
  useEffect(() => {
    fetch(`http://localhost:8080/userstats/${username}`)
      .then((res) => res.json())
      .then((json) => {
        setStats(json.response)
        console.log('json.response', json.response);
      })
  }, []);

  return (
    <table>
      <thead>
        <tr>
          <th>Quiz Type</th>
          <th>Score</th>
          <th>Points</th>
          <th>Time</th>
          <th>Opponent</th>
        </tr>
      </thead>

      <tbody>
        {stats.map((item) => (
          <tr>
            <td>{item.quiztype}</td>
            <td>{item.score}</td>
            <td>{item.points}</td>
            <td>{item.time}</td>
            <td>{item.opponent}</td>
          </tr>
        ))}
      </tbody>
    </table>

  )
}

export default Statistics;