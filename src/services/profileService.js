import axios from "axios";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/app/firebase";
import toast from "react-hot-toast";

const API_BASE_URL =
  "https://us-central1-onboarding-bot-14200.cloudfunctions.net/expressApi/api/user-profile";

const fetchFirebaseQuestions = async (assistantId) => {
  try {
    const ref = doc(db, "domains", assistantId);
    const snap = await getDoc(ref);
    if (snap.exists()) {
      const data = snap.data();
      return Array.isArray(data.userProfile) ? data.userProfile : [];
    }
  } catch (err) {
    console.error("Firebase fetch error:", err.message);
  }
  return [];
};

const fetchUserProfile = async (assistantId, user, setUserProfile) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/${assistantId}/${user.email}`,
    );
    setUserProfile(data);
  } catch (_) {
    // silently ignore
  }
};

const fetchAnswersFromAPI = async (
  assistantId,
  user,
  setAnswers,
  questions,
) => {
  try {
    const { data } = await axios.get(
      `${API_BASE_URL}/${assistantId}/${user.email}`,
    );
    const mappedAnswers = {};

    questions.forEach((q, index) => {
      const found = data.find((item) => item.question === q.question);
      if (found) {
        mappedAnswers[index] = found.answer;
      }
    });
    setAnswers(mappedAnswers);
  } catch (_) {
    // silently ignore
  }
};

const submitAnswersToAPI = async (assistantId, user, answers, setLoading) => {
  setLoading(true);

  const payload = {
    assistant_id: assistantId,
    user_email: user.email,
    user_info: answers,
  };

  const promise = axios.post(API_BASE_URL, payload);

  toast.promise(promise, {
    loading: "Saving...",
    success: "Saved successfully",
    error: "Error saving info",
  });

  try {
    await promise;
    return true;
  } catch (err) {
    console.error("Submission error:", err.message);
    return false;
  } finally {
    setLoading(false);
  }
};

const profileService = {
  fetchFirebaseQuestions,
  fetchAnswersFromAPI,
  fetchUserProfile,
  submitAnswersToAPI,
};

export default profileService;
