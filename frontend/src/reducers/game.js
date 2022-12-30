import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  operation: null,
  questions: {},
  equations: {},
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
    submitEquations: (state, action) => {
      state.equations = action.payload;
      console.log('equations assigned in reducer:', state.equations)
    },
    submitEqAnswer: (state, action) => {
      state.answers = action.payload;

      // eslint-disable-next-line eqeqeq
      if (state.answers == state.equations.correct_answer) {
        state.isCorrect = true
      } else {
        state.isCorrect = false
      }
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