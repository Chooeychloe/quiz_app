import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  started: false,
  finished: false,
  currentQuestionIndex: 0,
  score: 0,
  answers: [],
  student: {},
  questions: [],
  timeLeft: 300, // 5 minutes
};

const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    startQuiz: (state, action) => {
      state.started = true;
      state.finished = false;
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.answers = [];
      state.questions = action.payload.questions;
      state.student = action.payload.student;
      state.timeLeft = 300;
    },
    setQuestions: (state, action) => {
      state.questions = action.payload;
    },

    answerQuestions: (state, action) => {
      const { questionId, isCorrect, selectedOption } = action.payload;
      state.answers.push({ questionId, isCorrect, selectedOption });
      if (isCorrect) state.score += 1;
    },
    finishQuiz: (state) => {
      state.finished = true;
      state.started = false;
    },
    setStudent: (state, action) => {
      state.student = action.payload;
    },
    decrementTimer: (state) => {
      if (state.timeLeft > 0) {
        state.timeLeft -= 1;
      } else {
        state.finished = true;
        state.started = false;
      }
    },
  },
});

export const {
  setQuestions,
  startQuiz,
  decrementTimer,
  answerQuestions,
  nextQuestion,        // ✅ add this
  previousQuestion,
  resetQuiz,
  setStudent
} = quizSlice.actions;


export default quizSlice.reducer;
