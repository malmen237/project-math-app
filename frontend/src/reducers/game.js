import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  operation: null,
  questions: {},
  answers: null,
  currentProblemIndex: 0,
  gameOver: false,
  isCorrect: null
}

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    submitOperation: (state, action) => {
      state.operation = action.payload;
    },
    submitQuestion: (state, action) => {
      state.questions = action.payload;
    },
    submitAnswer: (state, action) => {
      state.answers = action.payload;

      // eslint-disable-next-line eqeqeq
      if (state.answers.replace(',', '.') == state.questions.answer) {
        state.isCorrect = true
      } else {
        state.isCorrect = false
      }
    },
    goToNextQuestion: (state) => {
      if (state.currentProblemIndex + 1 === 9) {
        state.gameOver = true
      } else {
        state.currentProblemIndex += 1
      }
    }
  }
});