import React, { useState, useEffect } from 'react';

const Training = () => {
  const [problemSet, setProblemSet] = useState({});

  // Get set of questions from database
  useEffect(() => {
    fetch('http://localhost:8080/questions')
      .then((res) => res.json())
      .then((json) => setProblemSet(json.response))
      .then(() => console.log('problems', problemSet))
  }, [])

  return (
    <>
      {console.log(problemSet)}
      <h1>Question:{problemSet.question}</h1>
      <h2>Answer:{problemSet.answer}</h2>
      <button type="button">Next</button>
    </>

  )
}

export default Training