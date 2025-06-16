import axios from "axios";

const saveChat = async (
  chatTitle,
  sessionId,
  messages,
  assistantId,
  userEmail,
) => {
  try {
    const res = await axios.post(
      "https://us-central1-onboarding-bot-14200.cloudfunctions.net/expressApi/api/chats",
      {
        title: chatTitle,
        assistant_id: assistantId,
        user_email: userEmail,
        session_id: sessionId,
        messages,
      },
    );
    console.log("Chat saved:", res.data.message);
  } catch (error) {
    console.error("Failed to save chat:", error.message);
  }
};

const formatPayloadForAgent = (input, promptChain = [], userProfile = []) => {
  const profileText = userProfile
    .map((item) => `${item.question} ${item.answer}`)
    .join(" | ");

  return {
    userQuery: input,
    selectedModel: "gpt-4o",
    promptChain: promptChain.map((step) => ({
      messages: [
        { role: "system", content: step.finalPrompt },
        {
          role: "user",
          content: `User Query: ${input}\nUser Profile: ${profileText}`,
        },
      ],
      parameters: step.parameters || {},
    })),
  };
};

export const sendMessage = async (
  chatTitle,
  input,
  messages,
  setMessages,
  setInput,
  setLoading,
  userEmail,
  userCredits,
  sessionId,
  assistantId,
  promptChain,
  userProfile,
) => {
  if (!input.trim()) return;

  if (userCredits !== null && userCredits !== 0) {
    const newMessages = [...messages, { text: input, sender: "user" }];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Format payload
      const payload = formatPayloadForAgent(input, promptChain, userProfile);

      // Hit your API
      const response = await axios.post(
        "https://us-central1-onboarding-bot-14200.cloudfunctions.net/expressApi/chat/agent",
        payload,
      );

      const botText = response.data?.answer || "Sorry, I didn't get that.";

      const botMessage = {
        text: botText,
        sender: "bot",
      };

      setLoading(false);
      const updatedMessages = [...newMessages, botMessage];
      setMessages(updatedMessages);

      // Save last 2 messages: user + bot
      await saveChat(
        chatTitle,
        sessionId,
        updatedMessages.slice(-2),
        assistantId,
        userEmail,
      );
    } catch (error) {
      console.error("Agent API Error:", error.message);
      setMessages([
        ...newMessages,
        {
          text: "❌ Error fetching response. Try again later.",
          sender: "bot",
        },
      ]);
    }
  } else {
    setInput("");
    const newMessages = [
      ...messages,
      { text: input, sender: "user" },
      {
        text: "You do not have enough credits, buy more to continue.",
        sender: "bot",
      },
    ];
    setMessages(newMessages);
  }
};

const fetchSessions = async (
  assistantId,
  userEmail,
  setSessions,
  setLoading,
) => {
  try {
    setLoading(true);
    const res = await axios.get(
      `https://us-central1-onboarding-bot-14200.cloudfunctions.net/expressApi/api/chats/${assistantId}/${userEmail}`,
    );
    setSessions(res.data);
  } catch (_) {
    // Optional: handle errors or setSessions([])
  } finally {
    setLoading(false);
  }
};

const fetchChat = async (
  assistantId,
  userEmail,
  sessionId,
  setMessages,
  setLoading,
) => {
  setLoading(true);
  try {
    const res = await axios.get(
      `https://us-central1-onboarding-bot-14200.cloudfunctions.net/expressApi/api/chats/${assistantId}/${userEmail}/${sessionId}`,
    );
    setMessages(res.data);
  } catch (err) {
    if (err.response && err.response.status === 404) {
      setMessages([]); // return empty messages
    }
  } finally {
    setLoading(false);
  }
};

const chatbotService = {
  sendMessage,
  saveChat,
  fetchSessions,
  fetchChat,
};

export default chatbotService;
