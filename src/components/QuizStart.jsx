import { BookOpen, Clock, Play, Search } from "lucide-react";
import React from "react";
import { useDispatch } from "react-redux";
import { startQuiz } from "../store/quizSlice";

export default function QuizStart() {
  const dispatch = useDispatch();
  const handleStartQuiz = () => {
    dispatch(startQuiz());
  };
  return (
    <div className="max-w-4-xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8  text-center">
        <div className="mb-8">
          <div
            className="inline-flex items-center justify-center w-24 h-24
                bg-linear-to-br from-blue-100 to-purple-100 rounded-full mb-6"
          >
            <BookOpen className="w-12 h-12" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-4">
            Welcome to your Quiz!
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Test your knowledge with our exciting quiz. Click the button below
            to get started and see how much you know!
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-linear-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
            <div className="flex items-center justify-center mb-4">
              <BookOpen className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-blue-800 mb-2">8</div>
            <div className="text-2xl font-medium">Questions</div>
          </div>
          <div className="bg-linear-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-purple-800 mb-2">5:00</div>
            <div className="text-2xl font-medium">Minutes</div>
          </div>
          <div className="bg-linear-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <div className="flex items-center justify-center mb-4">
              <Clock className="w-8 h-8 text-blue-500" />
            </div>
            <div className="text-2xl font-bold text-green-800 mb-2">100%</div>
            <div className="text-2xl font-medium">Max Score</div>
          </div>
        </div>
        <div className="mb-8">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">
            Quiz Rules
          </h3>
          <div className="text-left bg-gray-50 p-6 rounded-xl max-w-2xl mx-auto">
            <ul className="space-y-3 text-gray-700">
              <li className="flex items-start">
                <span
                  className="flex shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full
                             items-center justify-center text-sm font-semibold mr-3 mt-0.5"
                >
                  1
                </span>
                <span>
                  Each questions has multiple choice answers. Select the one you
                  think is correct.
                </span>
              </li>
              <li className="flex items-start">
                <span
                  className="flex shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full
                             items-center justify-center text-sm font-semibold mr-3 mt-0.5"
                >
                  2
                </span>
                <span>
                  You have a total of 5 minutes to complete the quiz. Keep an
                  eye on the timer!
                </span>
              </li>
              <li className="flex items-start">
                <span
                  className="flex shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full
                             items-center justify-center text-sm font-semibold mr-3 mt-0.5"
                >
                  3
                </span>
                <span>
                  Once you select an answer, you'll see the explanation.
                </span>
              </li>
              <li className="flex items-start">
                <span
                  className="flex shrink-0 w-6 h-6 bg-blue-100 text-blue-600 rounded-full
                             items-center justify-center text-sm font-semibold mr-3 mt-0.5"
                >
                  1
                </span>
                <span>
                  You can navigate to back and forth between questions using the
                  Next and Previous buttons.
                </span>
              </li>
            </ul>
          </div>
        </div>
        <button
          className="inline-flex items-center space-x-3 py-4 px-8 bg-linear-to-r from-blue-500 to-purple-600 text-white rounded-xl
           hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-200 shadow-lg
          font-semibold text-lg cursor-pointer"
          onClick={handleStartQuiz}
        >
          <Play size={24} />
          <span className="ml-3 text-2xl font-semibold">Start Quiz</span>
        </button>
      </div>
    </div>
  );
}
