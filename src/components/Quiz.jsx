import React, { useEffect } from "react";
import QuizStart from "./QuizStart";
import ProgressBar from "./ProgressBar";
import Timer from "./Timer";
import { useSelector, useDispatch } from "react-redux";
import Questions from "./Questions";
import { sampleQuestions } from "../data/questions";
import { setQuestions } from "../store/quizSlice";
import Result from "./Result";

export default function Quiz() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(setQuestions(sampleQuestions));
  }, dispatch);
  const {
    questions,
    currentQuestionIndex,
    answers,
    isQuizCompleted,
    isTimerActive,
  } = useSelector((state) => state.quiz);

  if (questions.length === 0) {
    return (
      <div
        className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex
      items-center justify-center"
      >
        <div className="text-center">
          <div
            className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600
          mx-auto"
          ></div>
          <p className="mt-4 text-gray-600">Loading</p>
        </div>
      </div>
    );
  }

  if (isQuizCompleted) {
    return (
      <div
        className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50  
        py-8 px-4"
      >
        <Result />
      </div>
    );
  }
  if (!isTimerActive && answers.length === 0) {
    return (
      <div
        className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex py-8 px-4
      items-center justify-center"
      >
        <QuizStart />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div
            className="flex flex-col md:flex-row md:items-center md:justify-between
            space-y-4 md:space-y-0"
          >
            <div className="flex-1">
              <ProgressBar
                current={currentQuestionIndex + 1}
                total={questions.length}
              />
            </div>
            <div className="md:ml-6">
              <Timer />
            </div>
          </div>
        </div>
      </div>
      <Questions />
    </div>
  );
}
