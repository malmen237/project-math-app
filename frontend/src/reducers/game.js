import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  operation: null,
  setNumber: null,
  questions: {},
  answers: null,
  currentProblemIndex: 0,
  gameOver: false,
  isCorrect: null,
  // ADDED:
  correctAnswers: 0,
  userPoints: 0
}

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
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
      console.log('state.answer:', state.answers, typeof state.answers)
      const answerType = typeof state.answers

      if (answerType === 'string') {
        // eslint-disable-next-line eqeqeq
        if (state.answers.replace(',', '.') == state.questions.answer) {
          state.isCorrect = true
          // ADDED two lines:
          state.correctAnswers += 1;
          state.userPoints += 3;
        } else {
          state.isCorrect = false
        }
      }

      if (answerType === 'number') {
        // eslint-disable-next-line eqeqeq
        if (state.answers == state.questions.answer) {
          state.isCorrect = true
          // ADDED two lines:
          state.correctAnswers += 1;
          state.userPoints += 3;
        } else {
          state.isCorrect = false
        }
      }
    },
    goToNextQuestion: (state) => {
      if (state.currentProblemIndex + 1 === 9) {
        state.gameOver = true
        // ADDED one line:
        state.currentProblemIndex += 1
      } else {
        state.currentProblemIndex += 1
      }
    }
  }
});