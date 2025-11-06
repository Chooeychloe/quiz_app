import React, { useState } from "react";
import emailjs from "@emailjs/browser";

export default function StudentForm({ onRegister }) {
  const [name, setName] = useState("");
  const [studentId, setStudentId] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!name.trim() || !studentId.trim()) {
      setError("Please fill out all fields.");
      return;
    }

    // Optional: Check duplicate student ID using localStorage
    const existingIds = JSON.parse(localStorage.getItem("registeredStudents") || "[]");
    if (existingIds.includes(studentId)) {
      setError("This Student ID has already registered.");
      return;
    }

    setLoading(true);

    // Save student ID to localStorage
    existingIds.push(studentId);
    localStorage.setItem("registeredStudents", JSON.stringify(existingIds));

    // Send student info to teacher email using EmailJS
    try {
      await emailjs.send(
        "service_npo2l6o", // Replace with your actual service ID
        "template_4p5lmue", // Replace with your template ID
        {
          student_name: name,
          student_id: studentId,
          to_email: "edan.belgica@cvsu.edu.ph", // Replace with your teacher’s email
        },
        "Sfd3p8tcdPiAP3zDF" // Replace with your EmailJS public key
      );

      // Pass student data up to Quiz.jsx
      onRegister({ name, studentId });
    } catch (err) {
      console.error(err);
      setError("Failed to send registration email. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-purple-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Student Registration
        </h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-gray-700 font-medium mb-1">Full Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your name"
            />
          </div>

          <div>
            <label className="block text-gray-700 font-medium mb-1">Student ID</label>
            <input
              type="text"
              value={studentId}
              onChange={(e) => setStudentId(e.target.value)}
              className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your student ID"
            />
          </div>

          {error && (
            <p className="text-red-600 bg-red-50 border border-red-200 px-3 py-2 rounded-lg text-sm">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-3 rounded-lg text-white font-semibold transition-all duration-200 ${
              loading
                ? "bg-blue-300 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700"
            }`}
          >
            {loading ? "Registering..." : "Start Quiz"}
          </button>
        </form>
      </div>
    </div>
  );
}
