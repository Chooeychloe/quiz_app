import { Award, Clock, Medal, Target } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import emailjs from "emailjs-com";

export default function Result() {
  const { score, questions, answers, timeLeft, student } = useSelector(
    (state) => state.quiz
  );

  const [emailSent, setEmailSent] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");

  const totalQuestions = questions.length;
  const percentage = Math.round((score / totalQuestions) * 100);
  const timeUsed = 300 - timeLeft;
  const minutesUsed = Math.floor(timeUsed / 60);
  const secondsUsed = timeUsed % 60;

  // 🧠 Automatically send result via EmailJS when quiz finishes
  useEffect(() => {
    const sendEmailResult = async () => {
      if (emailSent) return; // prevent duplicate emails

      try {
        setStatusMessage("⏳ Submitting your result...");

        const templateParams = {
          student_name: student.name,
          student_id: student.studentId,
          student_email: student.email,
          score: `${score} / ${totalQuestions}`,
          percentage: `${percentage}%`,
          time_used: `${minutesUsed}:${secondsUsed.toString().padStart(2, "0")}`,
          teacher_email: "edan.belgica@cvsu.edu.ph", // Replace with your teacher’s email
        };

        await emailjs.send(
          "service_npo2l6o", // 🔧 Replace with your EmailJS Service ID
          "template_4p5lmue", // 🔧 Replace with your EmailJS Template ID
          templateParams,
          "Sfd3p8tcdPiAP3zDF" // 🔧 Replace with your EmailJS Public Key
        );

        setEmailSent(true);
        setStatusMessage("✅ Your result has been successfully submitted to your teacher.");
        console.log("Email sent successfully:", templateParams);
      } catch (error) {
        console.error("Error sending email:", error);
        setStatusMessage("❌ Failed to submit result. Please contact your teacher.");
      }
    };

    sendEmailResult();
  }, [emailSent, score, totalQuestions, minutesUsed, secondsUsed, student]);

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        {/* Header */}
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-24 h-24 rounded-full mb-6 bg-yellow-50">
            <Award className="w-12 h-12 text-yellow-500" />
          </div>
          <h1 className="text-4xl font-bold text-gray-800">Quiz Completed</h1>
          <p className="text-2xl font-semibold mb-6 text-gray-600">Your Performance</p>
        </div>

        {/* Summary Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-6 rounded-xl">
            <Target className="w-8 h-8 text-blue-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-blue-600 mb-2">
              {score} / {totalQuestions}
            </div>
            <div className="text-blue-600 font-medium">Correct Answers</div>
          </div>

          <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-6 rounded-xl">
            <Medal className="w-8 h-8 text-purple-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-purple-600 mb-2">
              {percentage}%
            </div>
            <div className="text-purple-600 font-medium">Score Percentage</div>
          </div>

          <div className="bg-gradient-to-br from-green-50 to-green-100 p-6 rounded-xl">
            <Clock className="w-8 h-8 text-green-600 mx-auto mb-4" />
            <div className="text-3xl font-bold text-green-600 mb-2">
              {minutesUsed}:{secondsUsed.toString().padStart(2, "0")}
            </div>
            <div className="text-green-600 font-medium">Time Used</div>
          </div>
        </div>

        {/* Question Review */}
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Question Review
        </h3>
        <div className="grid gap-4 max-h-64 overflow-y-auto">
          {questions.map((question, index) => {
            const answer = answers.find((ans) => ans.questionId === question.id);
            const isCorrect = answer?.isCorrect ?? false;
            return (
              <div
                key={index}
                className={`flex items-center justify-between p-4 rounded-lg border-2 ${
                  isCorrect
                    ? "border-green-200 bg-green-50"
                    : "border-red-200 bg-red-50"
                }`}
              >
                <span className="text-sm font-medium text-gray-700">
                  Question {index + 1}
                </span>
                <span
                  className={`px-3 py-1 rounded-full text-sm font-medium ${
                    isCorrect ? "text-green-700" : "text-red-700"
                  }`}
                >
                  {question.question}
                </span>
              </div>
            );
          })}
        </div>

        {/* Status Message */}
        <div className="mt-10">
          <p className="text-lg font-medium text-gray-600">{statusMessage}</p>
        </div>
      </div>
    </div>
  );
}
