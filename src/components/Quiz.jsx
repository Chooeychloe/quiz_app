import React, { useState, useEffect } from "react";
import StudentForm from "./StudentForm";
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
  const [student, setStudent] = useState(null);

  useEffect(() => {
    dispatch(setQuestions(sampleQuestions));
  }, [dispatch]);

  const { questions, currentQuestionIndex, answers, isQuizCompleted, isTimerActive } =
    useSelector((state) => state.quiz);

  if (!student) return <StudentForm onRegister={setStudent} />;

  if (isQuizCompleted) {
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
        <Result student={student} />
      </div>
    );
  }

  if (questions.length === 0) return <div>Loading...</div>;

  if (!isTimerActive && answers.length === 0)
    return (
      <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 flex py-8 px-4 items-center justify-center">
        <QuizStart />
      </div>
    );

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 via-white to-purple-50 py-8 px-4">
      <div className="max-w-4xl mx-auto mb-8">
        <div className="bg-white rounded-xl shadow-lg p-6">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between">
            <ProgressBar current={currentQuestionIndex + 1} total={questions.length} />
            <Timer />
          </div>
        </div>
      </div>
      <Questions />
    </div>
  );
}
