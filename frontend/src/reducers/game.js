import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: {},
  answers: {},
  currentProblemIndex: 0,
  gameOver: false
}

export const game = createSlice({
  name: 'game',
  initialState,
  reducers: {
    submitQuestion: (state, action) => {
      state.questions = action.payload;
    },
    submitAnswer: (state, action) => {
      const { questionId } = action.payload
      const question = state.questions.find((q) => q.id === questionId)

      if (!question) {
        throw new Error('Could not find question! Check to make sure you are passing the question id correctly.')
      }

      state.answers.push({
        questionId,
        question
        // isCorrect: question.correctAnswerIndex === answerIndex
      })
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