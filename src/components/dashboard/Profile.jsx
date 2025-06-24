"use client";
import { useContext, useEffect, useState } from "react";
import { FcBusinessman } from "react-icons/fc";
import { AppContext } from "@/context/AppContext";
import profileService from "@/services/profileService";
import { userValidation } from "@/hooks/validation";

export default function Profile() {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(false);
  const { user, assistantId } = useContext(AppContext);

  useEffect(() => {
    const fetchData = async () => {
      if (!user?.email || !assistantId) return;
      const fetchedQuestions =
        await profileService.fetchFirebaseQuestions(assistantId);
      setQuestions(fetchedQuestions);

      profileService.fetchAnswersFromAPI(
        assistantId,
        user,
        setAnswers,
        fetchedQuestions,
      );
    };

    fetchData();
  }, [assistantId, user]);

  userValidation();

  const handleChange = (index, value) => {
    setAnswers((prev) => ({
      ...prev,
      [index]: value,
    }));
  };

  const handleSubmit = async () => {
    const answerList = questions.map((q, index) => ({
      question: q.question,
      answer: answers[index] || "",
    }));

    await profileService.submitAnswersToAPI(
      assistantId,
      user,
      answerList,
      setLoading,
    );
  };

  return (
    <div className="mx-auto mt-16 max-w-6xl space-y-10 px-6 py-10">
      {questions.length > 0 ? (
        <>
          <div className="space-y-2 text-left">
            <h1 className="flex items-center gap-3 text-3xl font-bold text-gray-900">
              <FcBusinessman className="h-7 w-7" />
              User Profile
            </h1>
            <p className="text-gray-600">
              Please fill out the following questions to complete your profile.
            </p>
          </div>

          <div className="space-y-6">
            {questions.map((q, index) => (
              <div key={index}>
                <label className="mb-1 block font-medium text-gray-800">
                  {q.question}
                </label>
                <input
                  type="text"
                  className="w-full rounded-sm border border-gray-300 p-4 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  placeholder="Type your answer..."
                  value={answers[index] || ""}
                  onChange={(e) => handleChange(index, e.target.value)}
                />
              </div>
            ))}
          </div>

          <button
            onClick={handleSubmit}
            className="mt-6 rounded-md bg-indigo-600 px-6 py-3 text-white hover:bg-indigo-700"
          >
            Submit
          </button>
        </>
      ) : (
        <div className="mt-60 flex items-center justify-center">
          <p></p>
        </div>
      )}
    </div>
  );
}
