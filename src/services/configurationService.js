import { db } from "@/app/firebase";
import { doc, getDoc } from "firebase/firestore";

const fetchActivePromptDetails = async (assistantId, setPromptChain) => {
  if (!assistantId) return [];

  try {
    const docRef = doc(db, "domains", assistantId);
    const docSnap = await getDoc(docRef);

    if (!docSnap.exists()) return [];

    const data = docSnap.data();
    const promptLibrary = data.promptLibrary || [];

    const activePrompts = promptLibrary.filter((item) => item.active === true);

    const results = [];

    activePrompts.forEach((promptItem) => {
      const settings = (promptItem.promptSettings || []).filter(
        (setting) => setting.status === "production",
      );

      settings.forEach((setting) => {
        const parameters = setting.parameters || {};
        const prompts = (setting.prompts || []).filter(
          (p) => p.active === true,
        );
        const finalPrompt = prompts.map((p) => p.value).join(" ");

        results.push({ parameters, finalPrompt });
      });
    });

    setPromptChain(results);
  } catch (error) {
    console.error("Error fetching active prompts:", error);
  }
};

const fetchAssistantConfiguration = async (
  assistantId,
  setConfiguration,
  setConfigLoader,
  setLlm,
  setModel,
) => {
  if (!assistantId) return;

  try {
    const docRef = doc(db, "domains", assistantId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data?.configuration) {
        setConfiguration(data.configuration);

        // Set llm and model if present
        if (data.configuration.llm) {
          setLlm(data.configuration.llm);
        }
        if (data.configuration.model) {
          setModel(data.configuration.model);
        }
      }
    }
  } catch (error) {
    console.error("Error fetching configuration:", error);
  } finally {
    setConfigLoader(false);
  }
};

const fetchAssistantConfigurationServer = async (assistantId) => {
  if (!assistantId) return;

  try {
    const docRef = doc(db, "domains", assistantId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      if (data?.configuration) {
        return data.configuration;
      }
    }
  } catch (error) {
    console.error("Error fetching configuration:", error);
  }
};

const configurationService = {
  fetchActivePromptDetails,
  fetchAssistantConfiguration,
  fetchAssistantConfigurationServer,
};

export default configurationService;
