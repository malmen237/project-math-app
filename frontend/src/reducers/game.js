import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  operation: null,
  setNumber: null,
  questions: [],
  answers: null,
  currentProblemIndex: 0,
  gameOver: false,
  isCorrect: null,
  correctAnswers: 0,
  userPoints: 0,
  // Time is added in seconds
  time: 0,
  mode: null,
  opponent: '-'
}

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setMode: (state, action) => {
      state.mode = action.payload;
    },
    submitOpponent: (state, action) => {
      state.opponent = action.payload;
    },
    submitOperation: (state, action) => {
      state.operation = action.payload;

      if (state.operation === '+' || state.operation === '-') {
        state.setNumber = 1000;
      } else if (state.operation === '*' || state.operation === '/') {
        state.setNumber = 12;
      } else if (state.operation === 'eq' || state.operation === 'fr') {
        state.setNumber = 10;
      }
    },
    submitQuestion: (state, action) => {
      state.questions = action.payload;
    },
    submitAnswer: (state, action) => {
      state.answers = action.payload;
      const answerType = typeof state.answers;
      const correctAnswer = state.questions[state.currentProblemIndex].answer;
      console.log('USER-answer', state.answers)
      console.log('TRUE-answer', correctAnswer[0], correctAnswer[1])

      if (answerType === 'string') {
        // eslint-disable-next-line eqeqeq
        if (state.answers.replace(',', '.') == correctAnswer) {
          state.isCorrect = true;
          state.correctAnswers += 1;
          state.userPoints += 3;
        } else {
          state.isCorrect = false;
        }
      } else if (answerType === 'object') {
        if (state.answers[0] === correctAnswer[0] && state.answers[1] === correctAnswer[1]) {
          state.isCorrect = true;
          state.correctAnswers += 1;
          state.userPoints += 3;
        } else {
          state.isCorrect = false;
        }
      }
    },
    submitTime: (state, action) => {
      state.time = action.payload;
    },
    goToNextQuestion: (state) => {
      if (state.currentProblemIndex + 1 === 9) {
        state.gameOver = true
        state.currentProblemIndex += 1
      } else {
        state.currentProblemIndex += 1
      }
    },
    restart: () => {
      return initialState
    }
  }
});