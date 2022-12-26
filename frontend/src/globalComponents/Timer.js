import React from 'react';

const Timer = (time) => {
  const minutes = Math.floor(time.time / 60) % 60;
  const seconds = time.time % 60;

  // Adds a zero before number if it's single digits
  const paddedNumber = (number, length) => {
    let str = `${number}`;
    while (str.length < length) {
      str = `0${str}`;
    }
    return str;
  }

  return (
    <p>{`Time ${paddedNumber(minutes, 2)}:${paddedNumber(seconds, 2)}`}</p>
  )
}

export default Timer;