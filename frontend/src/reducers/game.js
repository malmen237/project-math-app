import { createSlice } from '@reduxjs/toolkit';

const initialState = {
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
    submitQuestion: (state, action) => {
      state.questions = action.payload;
    },
    submitAnswer: (state, action) => {
      state.answers = action.payload;

      if (state.answers === state.questions.answer) {
        state.isCorrect = true
      } else {
        state.isCorrect = false
      }

      console.log('userAnswer', state.answers)
    },
    goToNextQuestion: (state) => {
      if (state.currentProblemIndex + 1 === 10) {
        state.gameOver = true
      } else {
        state.currentProblemIndex += 1
      }
    }
  }
})